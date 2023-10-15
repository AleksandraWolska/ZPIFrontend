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
import {
  Comment,
  SpecificAvailability,
  StoreConfig,
  SubItemInfo,
} from "../../../types";
import AttributesList from "../features/AttributesList";
import CommentComponent from "../features/CommentComponent";
import Ratings from "../features/Ratings";
import RatingsInteractive from "../features/RatingsInteractive";
import QuantityInput from "../components/core/QuantityInput";
import SubItemsList from "../components/core/SubItemsList";
import useItemDetails from "./useItemDetails";
import useDetailsPageConfig from "./useDetailsPageConfig";
import { CheckAvailabilityCalendar } from "../components/core/CheckAvailabilityCalendar";
import { FreeRangesCalendar } from "../components/core/FreeRangesCalendar";
import {
  FixedReservationData,
  FlexibleReservationData,
  RequiredUserInfo,
  ReservationRequest,
} from "../types";
import useReserveItem from "./useReserveItem";
import { ReservationDialog } from "./ReservationDialog";
import ItemImage from "../features/ItemImage";

const userId = "user1";
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

const initializeAvailabilityChecked = (core: StoreConfig["core"]): boolean => {
  if (core.flexibility && core.uniqueness) return true;
  return false;
};

export default function ItemDetailsPage() {
  const storeConfig = useDetailsPageConfig();
  const itemInfo = useItemDetails();
  const reserveItem = useReserveItem();

  const params = useParams() as { storeId: string; itemId: string };

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [reservationSummary, setReservationSummary] = useState(false);
  const [reservationRequest, setReservationRequest] =
    useState<ReservationRequest>();
  const [reservationRequestReady, setReservationRequestReady] = useState(
    initializeReservationRequestReady(
      storeConfig.core,
      itemInfo.itemStatus.availableAmount,
    ),
  );
  const [userCount, setUserCount] = useState(1);
  const [availabilityChecked, setAvailabilityChecked] = useState(
    initializeAvailabilityChecked(storeConfig.core),
  );
  const [selectedSubItemsInfoList, setSelectedSubItemsInfoList] = useState<
    SubItemInfo[]
  >([]);

  const makeReservationRequest = async (request: ReservationRequest) => {
    setReservationSummary(false);

    setReservationSummary(false);
    // console.log(request);

    try {
      await reserveItem.mutateAsync(request); // calling the useReserveItem mutation
      setShowSuccessDialog(true); // Show success dialog upon successful reservation
    } catch (error) {
      console.error("Error during reservation: ", error);
      // Handle error accordingly, e.g. show an error message to the user
    }
    console.log(request);
  };

  const prepareFixedReservationRequest = () => {
    const subItemIds = selectedSubItemsInfoList.map((info) => info.subItem);

    const data: FixedReservationData = {
      subItemList: subItemIds,
      amount: userCount,
    };
    setReservationRequest({
      storeId: params.storeId,
      itemId: params.itemId,
      userData: { id: userId },
      reservationData: data,
    });
    setReservationSummary(true);
  };

  const prepareFlexibleReservation = (data: FlexibleReservationData) => {
    setReservationRequest({
      storeId: params.storeId,
      itemId: params.itemId,
      userData: { id: userId },
      reservationData: data,
    });
    setReservationSummary(true);
  };

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

  const freeRangesUserInput = (
    <FreeRangesCalendar
      itemId={itemInfo.item.id}
      availabilityList={itemInfo.itemStatus.schedule as SpecificAvailability[]}
      userCount={userCount}
      availabilityChecked={availabilityChecked}
      setAvailabilityChecked={setAvailabilityChecked}
      prepareFlexibleReservation={prepareFlexibleReservation}
    />
  );

  const checkAvailabilityUserInput = (
    <CheckAvailabilityCalendar
      itemId={itemInfo.item.id}
      availabilityList={itemInfo.itemStatus.schedule as SpecificAvailability[]}
      userCount={userCount}
      prepareFlexibleReservation={prepareFlexibleReservation}
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
          onClick={() => prepareFixedReservationRequest()}
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

  const handleReservationFinished = () => {
    setShowSuccessDialog(false);
    setSelectedSubItemsInfoList([]);
    setUserCount(1);
    setReservationRequest(undefined);
  };
  return (
    <Box padding={3}>
      {reservationSummary && reservationRequest && (
        <ReservationDialog
          reservationRequest={reservationRequest}
          requiredUserInfo={["email", "name", "surname"] as RequiredUserInfo}
          makeReservationRequest={makeReservationRequest}
        />
      )}
      <Box display="flex">
        <Box
          borderRadius="10%"
          marginRight={3}
          marginBottom={3}
          maxWidth="25%"
          overflow="hidden"
          display="flex"
          alignItems="center"
        >
          {itemInfo.item.image && <ItemImage url={itemInfo.item.image} />}
        </Box>
        <Box>
          <Typography variant="h3" marginBottom={1}>
            {itemInfo.item.title}
          </Typography>
          {itemInfo.item.subtitle && (
            <Typography variant="h5" marginBottom={1}>
              {itemInfo.item.subtitle}
            </Typography>
          )}
          {storeConfig.detailsPage.showRating && itemInfo.itemStatus.mark && (
            <Ratings mark={itemInfo.itemStatus.mark} />
          )}
          {itemInfo.item.description && (
            <Typography variant="body2">{itemInfo.item.description}</Typography>
          )}
        </Box>
      </Box>
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
      <Dialog open={showSuccessDialog} onClose={handleReservationFinished}>
        <DialogTitle>Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>Reservation is done!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReservationFinished} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
