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
import { Comment, StoreConfig, SubItemInfo } from "../../../types";
import AttributesList from "../features/AttributesList";
import CommentComponent from "../features/CommentComponent";
import Ratings from "../features/Ratings";
import RatingsInteractive from "../features/RatingsInteractive";
import QuantityInput from "../components/core/QuantityInput";
import { FreeRangesDatepicker } from "../components/core/FreeRangersDatepicker";
import SubItemsList from "../components/core/SubItemsList";
import useItemDetails from "./useItemDetails";
import useDetailsPageConfig from "./useDetailsPageConfig";
import { CheckAvailabilityCalendar } from "../components/core/CheckAvailabilityCalendar";

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
  const itemInfo = useItemDetails();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [reservationRequestReady, setReservationRequestReady] = useState(
    initializeReservationRequestReady(
      storeConfig.core,
      itemInfo.itemStatus.availableAmount,
    ),
  );
  const [userCount, setUserCount] = useState(1);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [selectedSubItemsInfoList, setSelectedSubItemsInfoList] = useState<
    SubItemInfo[]
  >([]);

  const handleRatingAdd = (rating: number) => {
    console.log("New Rating:", rating);
  };

  const handleUserCountInputChange = (newValue: number) => {
    setReservationRequestReady(
      itemInfo.itemStatus.availableAmount
        ? itemInfo.itemStatus.availableAmount >= newValue
        : true,
    );
    setUserCount(newValue || 1);
    setAvailabilityChecked(false);
  };

  const handleUserCountInputChangeRestricted = (newValue: number) => {
    setReservationRequestReady(
      selectedSubItemsInfoList.length > 0 &&
        (selectedSubItemsInfoList[0].subItemStatus.availableAmount
          ? selectedSubItemsInfoList[0].subItemStatus.availableAmount >=
            newValue
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

  const toggleItemSingleSelection = (subItemInfo: SubItemInfo) => {
    if (
      selectedSubItemsInfoList.some(
        (selected) => selected.subItem.id === subItemInfo.subItem.id,
      )
    ) {
      setSelectedSubItemsInfoList((prev) =>
        prev.filter(
          (selected) => selected.subItem.id !== subItemInfo.subItem.id,
        ),
      );
    } else {
      setSelectedSubItemsInfoList(() => {
        return [subItemInfo];
      });
    }
    console.log(
      `set ${subItemInfo}of amount ${subItemInfo.subItemStatus.availableAmount} usercount ${userCount}`,
    );
    setReservationRequestReady(
      !subItemInfo.subItemStatus.availableAmount ||
        subItemInfo.subItemStatus.availableAmount >= userCount,
    );
  };

  const toggleItemMultipleSelection = (subItemInfo: SubItemInfo) => {
    let updatedSubItemsList;

    if (
      selectedSubItemsInfoList.some(
        (selected) => selected.subItem.id === subItemInfo.subItem.id,
      )
    ) {
      updatedSubItemsList = selectedSubItemsInfoList.filter(
        (selected) => selected.subItem.id !== subItemInfo.subItem.id,
      );
    } else {
      updatedSubItemsList = [...selectedSubItemsInfoList, subItemInfo];
    }

    setSelectedSubItemsInfoList(updatedSubItemsList);
    setReservationRequestReady(updatedSubItemsList.length > 0);
  };

  const userCountChoiceRestricted = (
    <Box>
      <QuantityInput
        disabled={selectedSubItemsInfoList.length === 0}
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
      id={itemInfo.item.id}
      userCount={userCount}
      onAvailabilityChecked={handleAvailabilityChecked}
    />
  );

  const checkAvailabilityUserInput = (
    <CheckAvailabilityDatepicker
      id={itemInfo.item.id}
      userCount={userCount}
      onAvailabilityChecked={handleAvailabilityChecked}
      availabilityChecked={availabilityChecked}
      setAvailabilityChecked={setAvailabilityChecked}
    />
  );

  const subItemsListSingle = (
    <SubItemsList
      selectedItemInfo={itemInfo}
      selectedSubItemsList={selectedSubItemsInfoList}
      toggleItemSelection={toggleItemSingleSelection}
    />
  );
  const subItemsListMultiple = (
    <SubItemsList
      selectedItemInfo={itemInfo}
      selectedSubItemsList={selectedSubItemsInfoList}
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
      <Typography variant="h3">{itemInfo.item.title}</Typography>
      {itemInfo.item.subtitle && (
        <Typography variant="h5">{itemInfo.item.subtitle}</Typography>
      )}
      {itemInfo.item.description && (
        <Typography variant="body2">{itemInfo.item.description}</Typography>
      )}
      {storeConfig.detailsPage.showRating && itemInfo.itemStatus.mark && (
        <Ratings mark={itemInfo.itemStatus.mark} />
      )}

      <AttributesList
        attributesConfig={storeConfig.customAttributesSpec}
        itemAttributes={itemInfo.item.customAttributeList}
      />

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
            {selectedSubItemsInfoList.map((i) => i.subItem.title).join(", ")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowSuccessDialog(false);
              setSelectedSubItemsInfoList([]); // Reset the selected items
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
