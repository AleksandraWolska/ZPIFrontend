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
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  CoreConfig,
  FetchedJsonSecondScreen,
  SubItem,
  UserAppBuilderConfig,
} from "./mocks/userapp_types";
import { jsonString } from "./mocks/json_template_second_screen";
import ParametersList from "./features/ParametersList";
import CommentList from "./features/CommentList";
import Ratings from "./features/Ratings";
import RatingsInteractive from "./features/RatingsInteractive";
import QuantityInput from "./components/core/CustomNumberInput";
import { FreeRangesDatepicker } from "./components/core/FreeRangersDatepicker";
import { CheckAvailabilityDatepicker } from "./components/core/CheckAvailabilityDatepicker";
import SubItemsList from "./components/core/SubItemsList";

export default function UserAppSecondScreen() {
  const { itemId } = useParams();

  const jsonData: FetchedJsonSecondScreen = JSON.parse(jsonString);
  const b: UserAppBuilderConfig = jsonData.userapp_builder_config;
  const c: CoreConfig = b.coreConfig;

  const { item } = jsonData.fetched_data;

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [reservationRequestReady, setReservationRequestReady] = useState(false);
  const [userCount, setUserCount] = useState(1);
  const [selectedSubItemsList, setSelectedSubItemsList] = useState<SubItem[]>(
    [],
  );

  const handleRatingAdd = (rating: number) => {
    console.log("New Rating:", rating);
  };

  const handleUserCountInputChange = (newValue: number) => {
    setReservationRequestReady(item.availableAmount! >= newValue);
    setUserCount(newValue || 1);
  };

  const handleUserCountInputChangeRestricted = (newValue: number) => {
    setReservationRequestReady(
      selectedSubItemsList.length > 0 &&
        selectedSubItemsList[0]!.availableAmount! >= newValue,
    );
    setUserCount(newValue || 1);
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

  const ratings = b.itemConfig.showRatingSecondScreen && item.mark && (
    <Ratings mark={item.mark} />
  );

  const ratingsInteractive = b.itemConfig.showRatingSecondScreen && (
    <RatingsInteractive handleSetRating={handleRatingAdd} />
  );

  const commentList = b.itemConfig.commentSection && item.commentList && (
    <CommentList selectedItem={item} handleSendComment={handleSendComment} />
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

  // todo pass itemid instead of whole item
  const freeRangesUserInput = (
    <FreeRangesDatepicker
      id={item.id}
      userCount={userCount}
      onAvailabilityChecked={handleAvailabilityChecked}
    />
  );
  // todo pass itemid instead of whole item
  const checkAvailabilityUserInput = (
    <CheckAvailabilityDatepicker
      id={item.id}
      userCount={userCount}
      onAvailabilityChecked={handleAvailabilityChecked}
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

  const dialog = (
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
      {/*  V9 & V10 */}
      {c.simultaneous &&
        c.periodicity &&
        !c.specificReservation &&
        userCountChoiceRestricted}

      {/* V3 & V5 */}
      {((c.simultaneous && !c.specificReservation && !c.periodicity) ||
        (c.flexibility && c.simultaneous)) &&
        userCountChoice}

      {/* V7 & V9 */}
      {c.flexibility && !c.uniqueness && checkAvailabilityUserInput}

      {/* V8 & V10 */}
      {c.flexibility && c.uniqueness && freeRangesUserInput}

      {/* V2 */}
      {!c.flexibility && !c.simultaneous && c.periodicity && subItemsListSingle}

      {/* V4 */}
      {!c.flexibility &&
        c.simultaneous &&
        !c.periodicity &&
        c.specificReservation &&
        subItemsListMultiple}

      {/* V6 */}
      {!c.flexibility &&
        c.simultaneous &&
        c.periodicity &&
        c.specificReservation &&
        subItemsListMultiple}

      {/* V5 */}
      {!c.flexibility &&
        c.simultaneous &&
        c.periodicity &&
        !c.specificReservation &&
        subItemsListSingle}

      {c.flexibility ? null : buttons}
    </Box>
  );

  return (
    <Box padding={3}>
      <Typography variant="h3">{item.title}</Typography>
      {item.subtitle && <Typography variant="h5">{item.subtitle}</Typography>}
      {item.description && (
        <Typography variant="body2">{item.description}</Typography>
      )}
      {ratings}
      <ParametersList
        parameterConfigMap={b.layoutConfig.parameterMap}
        selectedItem={item}
      />
      {core}
      {ratingsInteractive}
      {commentList}
      {dialog}
    </Box>
  );
}
