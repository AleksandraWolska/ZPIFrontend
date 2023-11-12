import { Box, Typography, Button, Divider } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { Comment, NewReservation, StoreConfig, SubItem } from "../../../types";
import AttributesList from "../components/detail-page-specific/AttributesList";
import Ratings from "../components/shared/Ratings";
import QuantityInput from "../components/core/QuantityInput";
import SubItemsList from "../components/core/SubItemsList";
import useItemDetails from "./useItemDetails";
import useDetailsPageConfig from "./useDetailsPageConfig";
import { CheckAvailabilityCalendar } from "../components/core/CheckAvailabilityCalendar";
import { FreeRangesCalendar } from "../components/core/FreeRangesCalendar";
import { FlexibleReservationData, NewComment } from "../types";
import useReserveItem from "./useReserveItem";
import { ReservationSummaryDialog } from "../components/detail-page-specific/ReservationSummaryDialog";
import ItemImage from "../components/shared/ItemImage";
import CommentsDisplay from "../components/detail-page-specific/CommentsDisplay";
import CommentInput from "../components/detail-page-specific/CommentInput";
import useAddComment from "../components/detail-page-specific/useAddComment";
import { ReservationSuccessDialog } from "../components/detail-page-specific/ReservationSuccessDialog";
import { ReservationFailureDialog } from "../components/detail-page-specific/ReservationFailureDialog";

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
  const item = useItemDetails();
  const reserveItem = useReserveItem();
  const addComment = useAddComment();

  const auth = useAuth();
  const navigate = useNavigate();

  const params = useParams() as { storeId: string; itemId: string };

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailureDialog, setShowFailureDialog] = useState(false);
  const [reservationSummary, setReservationSummary] = useState(false);
  const [reservation, setReservation] = useState<NewReservation>({
    itemId: params.itemId,
    userEmail: auth.user?.profile.email || "",
    personalData: {},
    confirmed: false,
    startDateTime: "",
    endDateTime: "",
    amount: 0,
    message: "",
  });
  const [reservationRequestReady, setReservationRequestReady] = useState(
    initializeReservationRequestReady(
      storeConfig.core,
      item.status.availableAmount,
    ),
  );
  const [userCount, setUserCount] = useState(1);
  const [availabilityChecked, setAvailabilityChecked] = useState(
    initializeAvailabilityChecked(storeConfig.core),
  );
  const [selectedSubItemsInfoList, setSelectedSubItemsInfoList] = useState<
    SubItem[]
  >([]);

  const makeReservation = async () => {
    setReservationSummary(false);

    try {
      reserveItem.mutate(reservation, {
        onSuccess: () => {
          setShowSuccessDialog(true); // Show success dialog upon successful reservation
        },
      }); // calling the useReserveItem mutation
    } catch (error) {
      console.error("Error during reservation: ", error);
      // Handle error accordingly, e.g. show an error message to the user
    }
  };

  const prepareFixedReservationRequest = () => {
    setReservation((prev) => ({
      ...prev,
      amount: userCount,
      subItemIds:
        selectedSubItemsInfoList.length > 0
          ? selectedSubItemsInfoList.map((si) => si.id)
          : undefined,
    }));
    setReservationSummary(true);
  };

  const prepareFlexibleReservation = (data: FlexibleReservationData) => {
    setReservation((prev) => ({
      ...prev,
      startDateTime: data.start,
      endDateTime: data.end,
      amount: userCount,
    }));
    setReservationSummary(true);
  };

  const handleUserCountItemInputChange = (newValue: number) => {
    setReservationRequestReady(
      item.status.availableAmount
        ? item.status.availableAmount >= newValue
        : true,
    );
    setUserCount(newValue || 1);
    setAvailabilityChecked(false);
  };

  const handleUserCountSubitemInputChange = (newValue: number) => {
    setReservationRequestReady(
      selectedSubItemsInfoList.length > 0 &&
        (selectedSubItemsInfoList[0].availableAmount
          ? selectedSubItemsInfoList[0].availableAmount >= newValue
          : true),
    );
    setUserCount(newValue || 1);
    setAvailabilityChecked(false);
  };

  const handleSendComment = (newComment: NewComment) => {
    const userComment: Comment = {
      id: "new",
      userId: "new",
      rating: newComment.rating,
      nickname: newComment.nickname,
      datetime: newComment.datetime,
      content: newComment.content,
    };

    addComment.mutate(userComment, {
      onSuccess: () => {
        console.log(`Send request with newcomment`);
        console.log(userComment);
      },
    });
  };

  const toggleItemSingleSelection = (subItem: SubItem) => {
    if (
      selectedSubItemsInfoList.some((selected) => selected.id === subItem.id)
    ) {
      setSelectedSubItemsInfoList((prev) =>
        prev.filter((selected) => selected.id !== subItem.id),
      );
    } else {
      setSelectedSubItemsInfoList(() => {
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

    if (
      selectedSubItemsInfoList.some((selected) => selected.id === subItem.id)
    ) {
      updatedSubItemsList = selectedSubItemsInfoList.filter(
        (selected) => selected.id !== subItem.id,
      );
    } else {
      updatedSubItemsList = [...selectedSubItemsInfoList, subItem];
    }

    setSelectedSubItemsInfoList(updatedSubItemsList);
    setReservationRequestReady(updatedSubItemsList.length > 0);
  };

  const userCountChoiceSubitem = (
    <Box>
      <QuantityInput
        disabled={selectedSubItemsInfoList.length === 0}
        value={userCount}
        onUserCountChange={(value: number) =>
          handleUserCountSubitemInputChange(value)
        }
      />
    </Box>
  );

  const userCountChoiceItem = (
    <Box>
      <QuantityInput
        disabled={false}
        value={userCount}
        onUserCountChange={(value: number) =>
          handleUserCountItemInputChange(value)
        }
      />
    </Box>
  );

  const freeRangesUserInput = (
    <FreeRangesCalendar
      // maybe change for store open hours as default
      earliestCalendarStart={
        item.status.earliestStart
          ? item.status.earliestStart
          : "2023-10-05T06:00:00Z"
      }
      latestCalendarEnd={
        item.status.latestEnd ? item.status.latestEnd : "2023-10-05T20:00:00Z"
      }
      itemId={item.id}
      availabilityList={item.status.availability || []}
      userCount={userCount}
      availabilityChecked={availabilityChecked}
      setAvailabilityChecked={setAvailabilityChecked}
      prepareFlexibleReservation={prepareFlexibleReservation}
    />
  );

  const checkAvailabilityUserInput = (
    <CheckAvailabilityCalendar
      // maybe change for store open hours as default
      earliestCalendarStart={
        item.status.earliestStart
          ? item.status.earliestStart
          : "2023-10-05T06:00:00Z"
      }
      latestCalendarEnd={
        item.status.latestEnd ? item.status.latestEnd : "2023-10-05T20:00:00Z"
      }
      itemId={item.id}
      availabilityList={item.status.availability || []}
      userCount={userCount}
      prepareFlexibleReservation={prepareFlexibleReservation}
      availabilityChecked={availabilityChecked}
      setAvailabilityChecked={setAvailabilityChecked}
    />
  );

  const subItemsListSingle = (
    <SubItemsList
      selectedItem={item}
      selectedSubItemsList={selectedSubItemsInfoList}
      toggleItemSelection={toggleItemSingleSelection}
    />
  );
  const subItemsListMultiple = (
    <SubItemsList
      selectedItem={item}
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
          Reserve
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
        userCountChoiceSubitem}

      {/* V3 & V9 & V10 */}
      {((storeConfig.core.simultaneous &&
        !storeConfig.core.specificReservation &&
        !storeConfig.core.periodicity) ||
        (storeConfig.core.flexibility && storeConfig.core.simultaneous)) &&
        userCountChoiceItem}
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
    navigate("..", { relative: "path" });
    setShowSuccessDialog(false);
    setSelectedSubItemsInfoList([]);
    setUserCount(1);
  };

  const handleReservationFailure = () => {
    navigate("..", { relative: "path" });
    setShowFailureDialog(false);
    setSelectedSubItemsInfoList([]);
    setUserCount(1);
  };

  return (
    <Box padding={3}>
      {reservationSummary && reservation && (
        <ReservationSummaryDialog
          cancelReservation={() => setReservationSummary(false)}
          reservation={reservation}
          setReservation={setReservation}
          makeReservation={makeReservation}
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
          {item.attributes.image && <ItemImage url={item.attributes.image} />}
        </Box>
        <Box>
          <Typography variant="h3" marginBottom={1}>
            {item.attributes.title}
          </Typography>
          {item.attributes.subtitle && (
            <Typography variant="h5" marginBottom={1}>
              {item.attributes.subtitle}
            </Typography>
          )}
          {storeConfig.detailsPage.showRating && item.status.mark && (
            <Ratings mark={item.status.mark} />
          )}
          {item.attributes.description && (
            <Typography variant="body2">
              {item.attributes.description}
            </Typography>
          )}
        </Box>
      </Box>
      <AttributesList
        attributesConfig={storeConfig.customAttributesSpec}
        itemAttributes={item.customAttributeList}
      />
      <Typography sx={{ mt: 4 }} variant="h5">
        Reservation
      </Typography>
      <Divider />
      <Box sx={{ m: 2 }} />
      {core}
      {(storeConfig.detailsPage.showComments ||
        storeConfig.detailsPage.showRating) && (
        <Box marginTop="30px">
          <Box sx={{ m: 7 }} />
          <Typography variant="h5">
            {storeConfig.detailsPage.showComments ? "Reviews" : "Your rating"}
          </Typography>
          <Divider />
          <Box sx={{ m: 2 }} />
          <CommentInput
            showRatings={storeConfig.detailsPage.showRating}
            showComments={storeConfig.detailsPage.showComments}
            handleSendComment={handleSendComment}
          />
          {storeConfig.detailsPage.showComments && <CommentsDisplay />}
        </Box>
      )}
      {showSuccessDialog && (
        <ReservationSuccessDialog
          handleReservationFinished={handleReservationFinished}
        />
      )}
      {showFailureDialog && (
        <ReservationFailureDialog
          handleReservationFailure={handleReservationFailure}
        />
      )}
    </Box>
  );
}
