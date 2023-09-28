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
import { useParams } from "react-router-dom";

import { SubItem } from "../../../types";
import { FetchedJsonDetailsPage } from "../types";
import { jsonStringDetailPage } from "../mocks/responseDetailPage";

import AttributesList from "../features/AttributesList";
import CommentList from "../features/CommentList";
import Ratings from "../features/Ratings";
import RatingsInteractive from "../features/RatingsInteractive";
import QuantityInput from "../components/core/QuantityInput";
import { FreeRangesDatepicker } from "../components/core/FreeRangersDatepicker";
import { CheckAvailabilityDatepicker } from "../components/core/CheckAvailabilityDatepicker";
import SubItemsList from "../components/core/SubItemsList";

export default function ItemDetailsPage() {
  const { itemId } = useParams();
  const jsonData: FetchedJsonDetailsPage = JSON.parse(jsonStringDetailPage);
  const { storeConfig, item } = jsonData.data;

  const { core: coreConfig } = storeConfig;

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [reservationRequestReady, setReservationRequestReady] = useState(false);
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
    const newComment = {
      id: Math.random() * 1000,
      userId: Math.random() * 1000,
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
    id: number,
    start: string,
    end: string,
  ) => {
    setReservationRequestReady(true);
    console.log("Item ID:", itemId);
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
      {coreConfig.simultaneous &&
        coreConfig.periodicity &&
        !coreConfig.specificReservation &&
        userCountChoiceRestricted}

      {/* V3 & V9 & V10 */}
      {((coreConfig.simultaneous &&
        !coreConfig.specificReservation &&
        !coreConfig.periodicity) ||
        (coreConfig.flexibility && coreConfig.simultaneous)) &&
        userCountChoice}

      {/* V7 & V9 */}
      {coreConfig.flexibility &&
        !coreConfig.uniqueness &&
        checkAvailabilityUserInput}

      {/* V8 & V10 */}
      {coreConfig.flexibility && coreConfig.uniqueness && freeRangesUserInput}

      {/* V4 & V6 */}
      {!coreConfig.flexibility &&
        coreConfig.simultaneous &&
        coreConfig.specificReservation &&
        subItemsListMultiple}

      {/* V2 & V5 */}
      {!coreConfig.flexibility &&
        (!coreConfig.simultaneous ||
          (coreConfig.simultaneous && !coreConfig.specificReservation)) &&
        coreConfig.periodicity &&
        subItemsListSingle}

      {coreConfig.flexibility ? null : buttons}
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
        <AttributesList itemAttributes={item.customAttributeList!} />
      )}
      {core}
      {storeConfig.detailsPage.showRating && (
        <RatingsInteractive handleSetRating={handleRatingAdd} />
      )}

      {storeConfig.detailsPage.showComments && item.commentList && (
        <CommentList item={item} handleSendComment={handleSendComment} />
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
