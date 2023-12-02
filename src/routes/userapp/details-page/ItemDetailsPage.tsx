import {
  Box,
  Typography,
  Button,
  Divider,
  Collapse,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { ExpandMore } from "@mui/icons-material";
import { NewReservation, StoreConfig, SubItem } from "../../../types";
import AttributesList from "../components/detail-page-specific/AttributesList";
import Ratings from "../components/shared/Ratings";
import QuantityInput from "../components/core/QuantityInput";
import SubItemsList from "../components/core/SubItemsList";
import useItemDetails from "./useItemDetails";
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
import useStoreConfig from "../wrapper/useStoreConfig";

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
  const storeConfig = useStoreConfig();
  const item = useItemDetails();
  const reserveItem = useReserveItem();
  const addComment = useAddComment();

  const auth = useAuth();
  const navigate = useNavigate();

  const params = useParams() as { storeId: string; itemId: string };

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailureDialog, setShowFailureDialog] = useState(false);
  const [reservationSummary, setReservationSummary] = useState(false);
  const [hideDetails, setHideDetails] = useState(false);
  const [hideReservation, setHideReservation] = useState(false);
  const [hideComments, setHideComments] = useState(false);
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
    initializeReservationRequestReady(storeConfig.core, item.availableAmount),
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
      setShowFailureDialog(true);
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
      item.availableAmount ? item.availableAmount >= newValue : true,
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
    const userComment: NewComment = {
      rating: newComment.rating,
      nickname: newComment.nickname,
      datetime: newComment.datetime,
      content: newComment.content,
      itemId: newComment.itemId,
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
        item.earliestStartHour ? item.earliestStartHour : 5
      }
      latestCalendarEnd={item.latestEndHour ? item.latestEndHour : 22}
      itemId={item.id}
      availabilityList={item.availabilities || []}
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
        item.earliestStartHour ? item.earliestStartHour : 5
      }
      latestCalendarEnd={item.latestEndHour ? item.latestEndHour : 22}
      itemId={item.id}
      availabilityList={item.availabilities || []}
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
    <Box sx={{ mb: 2 }}>
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
        {item.attributes.image && (
          <Box
            borderRadius="10%"
            marginRight={3}
            marginBottom={3}
            maxWidth="25%"
            overflow="hidden"
            display="flex"
            alignItems="center"
          >
            <ItemImage url={item.attributes.image} />
          </Box>
        )}
        <Box>
          <Typography variant="h3" marginBottom={1}>
            {item.attributes.title}
          </Typography>
          {item.attributes.subtitle && (
            <Typography variant="h5" marginBottom={1}>
              {item.attributes.subtitle}
            </Typography>
          )}
          {storeConfig.detailsPage.showRating && item.mark !== undefined && (
            <Ratings mark={item.mark} ratingCount={item.ratingCount} />
          )}
          {item.attributes.description && (
            <Typography variant="body2">
              {item.attributes.description}
            </Typography>
          )}
        </Box>
      </Box>
      {item.customAttributeList && item.customAttributeList.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ mt: 2 }} variant="h5">
              Details
            </Typography>
            <IconButton
              onClick={() => setHideDetails(!hideDetails)}
              aria-label="expand"
              style={{
                transform: hideDetails ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 150ms",
              }}
            >
              <ExpandMore />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />
          <Collapse in={!hideDetails} timeout="auto" unmountOnExit>
            <AttributesList
              attributesConfig={storeConfig.customAttributesSpec}
              itemAttributes={item.customAttributeList}
            />
          </Collapse>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ mt: 2 }} variant="h5">
          Reservation
        </Typography>
        <IconButton
          onClick={() => setHideReservation(!hideReservation)}
          aria-label="expand"
          style={{
            transform: hideReservation ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 150ms",
          }}
        >
          <ExpandMore />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Collapse in={!hideReservation} timeout="auto" unmountOnExit>
        {core}
      </Collapse>
      {(storeConfig.detailsPage.showComments ||
        storeConfig.detailsPage.showRating ||
        storeConfig.mainPage.showRating) && (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ mt: 2 }} variant="h5">
              Reviews
            </Typography>
            <IconButton
              onClick={() => setHideComments(!hideComments)}
              aria-label="expand"
              style={{
                transform: hideComments ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 150ms",
              }}
            >
              <ExpandMore />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />
          <Collapse in={!hideComments} timeout="auto" unmountOnExit>
            <CommentInput
              showRatings={
                storeConfig.detailsPage.showRating ||
                storeConfig.mainPage.showRating
              }
              showComments={storeConfig.detailsPage.showComments}
              handleSendComment={handleSendComment}
            />
            {storeConfig.detailsPage.showComments && <CommentsDisplay />}
          </Collapse>
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
