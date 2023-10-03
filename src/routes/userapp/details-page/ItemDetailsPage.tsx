import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { Comment, StoreConfig, SubItem } from "../../../types";
import AttributesList from "../features/AttributesList";
import CommentComponent from "../features/CommentComponent";
import Ratings from "../features/Ratings";
import RatingsInteractive from "../features/RatingsInteractive";
import QuantityInput from "../components/core/QuantityInput";
import { FreeRangesDatepicker } from "../components/core/FreeRangersDatepicker";
import { CheckAvailabilityDatepicker } from "../components/core/CheckAvailabilityDatepicker";
import SubItemsList from "../components/core/SubItemsList";
import useItemDetails from "./useItemDetails";
import useDetailsPageConfig from "./useDetailsPageConfig";

const initializeReservationRequestReady = (
  core: StoreConfig["core"],
  availableAmount: number | undefined,
): boolean => {
  if (
    !core.flexibility &&
    !core.periodicity &&
    availableAmount &&
    availableAmount > 0
  )
    return true;
  return false;
};

export default function ItemDetailsPage() {
  const storeConfig = useDetailsPageConfig();
  const item = useItemDetails();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [reservationRequestReady, setReservationRequestReady] = useState(
    initializeReservationRequestReady(storeConfig.core, item.availableAmount),
  );
  const [userCount, setUserCount] = useState(1);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [selectedSubItemsList, setSelectedSubItemsList] = useState<SubItem[]>(
    [],
  );

  const handleRatingAdd = (rating: number) => {
    console.log("New Rating:", rating);
  };

  const handleUserCountInputChange = (newValue: number) => {
    setReservationRequestReady(
      item.availableAmount ? item.availableAmount >= newValue : true,
    );
    setUserCount(newValue || 1);
    setAvailabilityChecked(false);
  };

  const handleUserCountInputChangeRestricted = (newValue: number) => {
    setReservationRequestReady(
      selectedSubItemsList.length > 0 &&
        (selectedSubItemsList[0].availableAmount
          ? selectedSubItemsList[0].availableAmount >= newValue
          : true),
    );
    setUserCount(newValue || 1);
    setAvailabilityChecked(false);
  };

  const handleSendComment = (content: string) => {
    const newComment: Comment = {
      id: "new",
      userId: "new",
      nickname: "YourNickname",
      datetime: new Date().toISOString(),
      content,
    };
    console.log(`Send request with newcomment: ${newComment}`);
  };

  const toggleItemSingleSelection = (subItem: SubItem) => {
    if (selectedSubItemsList.some((selected) => selected.id === subItem.id)) {
      setSelectedSubItemsList((prev) =>
        prev.filter((selected) => selected.id !== subItem.id),
      );
    } else {
      setSelectedSubItemsList(() => {
        return [subItem];
      });
    }
    console.log(
      `set ${subItem}of amount ${subItem.availableAmount} usercount ${userCount}`,
    );
    setReservationRequestReady(
      !subItem.availableAmount || subItem.availableAmount >= userCount,
    );
  };

  const toggleItemMultipleSelection = (subItem: SubItem) => {
    let updatedSubItemsList;

    if (selectedSubItemsList.some((selected) => selected.id === subItem.id)) {
      updatedSubItemsList = selectedSubItemsList.filter(
        (selected) => selected.id !== subItem.id,
      );
    } else {
      updatedSubItemsList = [...selectedSubItemsList, subItem];
    }

    setSelectedSubItemsList(updatedSubItemsList);
    setReservationRequestReady(updatedSubItemsList.length > 0);
  };

  const userCountChoiceRestricted = (
    <Box>
      <QuantityInput
        disabled={selectedSubItemsList.length === 0}
        value={userCount}
        onUserCountChange={(value: number) =>
          handleUserCountInputChangeRestricted(value)
        }
      />
    </Box>
  );

  const userCountChoice = (
    <Box>
      <QuantityInput
        disabled={false}
        value={userCount}
        onUserCountChange={(value: number) => handleUserCountInputChange(value)}
      />
    </Box>
  );

  const handleAvailabilityChecked = (
    id: string,
    start: string,
    end: string,
  ) => {
    setReservationRequestReady(true);
    console.log("Item ID:", id);
    console.log("Start Date:", start);
    console.log("End Date:", end);
  };

  const freeRangesUserInput = (
    <FreeRangesDatepicker
      id={item.id}
      userCount={userCount}
      onAvailabilityChecked={handleAvailabilityChecked}
    />
  );

  const checkAvailabilityUserInput = (
    <CheckAvailabilityDatepicker
      id={item.id}
      userCount={userCount}
      onAvailabilityChecked={handleAvailabilityChecked}
      availabilityChecked={availabilityChecked}
      setAvailabilityChecked={setAvailabilityChecked}
    />
  );

  const subItemsListSingle = (
    <SubItemsList
      selectedItem={item}
      selectedSubItemsList={selectedSubItemsList}
      toggleItemSelection={toggleItemSingleSelection}
    />
  );
  const subItemsListMultiple = (
    <SubItemsList
      selectedItem={item}
      selectedSubItemsList={selectedSubItemsList}
      toggleItemSelection={toggleItemMultipleSelection}
    />
  );

  const buttons = (
    <Box>
      {" "}
      <Box marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          disabled={!reservationRequestReady}
          onClick={() => setShowSuccessDialog(true)}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );

  const core = (
    <Box>
      {/*  V5  */}
      {storeConfig.core.simultaneous &&
        storeConfig.core.periodicity &&
        !storeConfig.core.specificReservation &&
        userCountChoiceRestricted}

      {/* V3 & V9 & V10 */}
      {((storeConfig.core.simultaneous &&
        !storeConfig.core.specificReservation &&
        !storeConfig.core.periodicity) ||
        (storeConfig.core.flexibility && storeConfig.core.simultaneous)) &&
        userCountChoice}

      {/* V7 & V9 */}
      {storeConfig.core.flexibility &&
        !storeConfig.core.uniqueness &&
        checkAvailabilityUserInput}

      {/* V8 & V10 */}
      {storeConfig.core.flexibility &&
        storeConfig.core.uniqueness &&
        freeRangesUserInput}

      {/* V4 & V6 */}
      {!storeConfig.core.flexibility &&
        storeConfig.core.simultaneous &&
        storeConfig.core.specificReservation &&
        subItemsListMultiple}

      {/* V2 & V5 */}
      {!storeConfig.core.flexibility &&
        (!storeConfig.core.simultaneous ||
          (storeConfig.core.simultaneous &&
            !storeConfig.core.specificReservation)) &&
        storeConfig.core.periodicity &&
        subItemsListSingle}

      {storeConfig.core.flexibility ? null : buttons}
    </Box>
  );

  return (
    <Box padding={3}>
      <Typography variant="h3">{item.title}</Typography>
      {item.subtitle && <Typography variant="h5">{item.subtitle}</Typography>}
      {item.description && (
        <Typography variant="body2">{item.description}</Typography>
      )}
      {storeConfig.detailsPage.showRating && item.mark && (
        <Ratings mark={item.mark} />
      )}

      {item.customAttributeList && (
        <AttributesList
          attributesConfig={storeConfig.customAttributesSpec}
          itemAttributes={item.customAttributeList!}
        />
      )}
      {core}
      {storeConfig.detailsPage.showRating && (
        <RatingsInteractive handleSetRating={handleRatingAdd} />
      )}

      {storeConfig.detailsPage.showComments && (
        <CommentComponent handleSendComment={handleSendComment} />
      )}
      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
      >
        <DialogTitle>Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have selected:{" "}
            {selectedSubItemsList.map((i) => i.title).join(", ")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowSuccessDialog(false);
              setSelectedSubItemsList([]); // Reset the selected items
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
