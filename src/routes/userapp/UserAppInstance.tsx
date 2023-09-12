/* eslint-disable no-lonely-if */
import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import { jsonString } from "./mocks/json_template";
import {
  UserAppBuilderConfig,
  Item,
  SubItem,
  FetchedJSON,
} from "./mocks/userapp_types";
import ImageS1 from "./components/ImageS1";
import Ratings from "./components/Ratings";
import QuantityInput from "./components/CustomNumberInput";

function UserAppInstance() {
  const jsonData: FetchedJSON = JSON.parse(jsonString);
  const b: UserAppBuilderConfig = jsonData.userapp_builder_config;
  const { items } = jsonData.fetched_data;

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showUserAmountChoice, setShowUserAmountChoice] = useState(false);
  const [showFreeRangesUserInput, setShowFreeRangesUserInput] = useState(false);
  const [showCheckAvailabilityUserInput, setShowCheckAvailabilityUserInput] =
    useState(false);
  const [showSubItemsList, setShowSubItems] = useState(false);
  const [selectedSubItemsList, setSelectedSubItemsList] = useState<SubItem[]>(
    [],
  );

  const handleItemSelect = (item: Item) => {
    if (b.core_config.flexibility) {
      // flexibility is true
      if (b.core_config.uniqueness) {
        if (b.core_config.simultaneousness) {
          setShowUserAmountChoice(true);
          setShowFreeRangesUserInput(true);
        } else {
          setShowFreeRangesUserInput(true);
        }
      } else {
        // uniqueness is false
        if (b.core_config.simultaneousness) {
          setShowUserAmountChoice(true);
          setShowCheckAvailabilityUserInput(true);
        } else {
          setShowCheckAvailabilityUserInput(true);
        }
      }
    } else {
      // flexibility is false
      if (b.core_config.simultaneousness) {
        if (b.core_config.specific_reservation) {
          setShowSubItems(true);
        } else {
          if (b.core_config.cyclicity) {
            setShowSubItems(true);
            setShowUserAmountChoice(true);
          } else {
            setShowUserAmountChoice(true);
          }
        }
      }
    }

    setSelectedItem(item);
  };

  // =================================================================================== USER AMOUNT CHOICE
  // simultaneousness=true, specific_reservation=false, cyclicity=false, flexibility=false
  // simultaneousness=true, specific_reservation=false, cyclicity=true, flexibility=false
  // simultaneousness=true, uniqueness=false, flexibility=true

  const [userCount, setUserCount] = useState(1);

  const handleUserCountInputChange = (newValue: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    showSubItemsList &&
    selectedSubItemsList.length > 0 &&
    selectedSubItemsList[0].available_amount &&
    selectedSubItemsList[0].available_amount >= newValue
      ? setReservationRequestReady(true)
      : setReservationRequestReady(false);

    if (newValue > userCount) {
      //
    } else if (newValue < userCount) {
      //
    } else {
      console.log("Value unchanged");
    }
    setUserCount(newValue || 1);
  };

  const userAmountChoice = showUserAmountChoice && (
    <Box>
      <QuantityInput
        disabled={showSubItemsList && selectedSubItemsList.length === 0}
        value={userCount}
        onUserCountChange={(value: number) => handleUserCountInputChange(value)}
      />
    </Box>
  );
  // =================================================================================== SHOW FREE RANGES USER INPUT
  // simultaneousness=true, uniqueness=true, flexibility=true
  // simultaneousness=false, uniqueness=true, flexibility=true
  const freeRangesUserInput = showFreeRangesUserInput && (
    <Box>freeRangesUserInput </Box>
  );
  // =================================================================================== CHECK AVAILABILITY USER INPUT
  // simultaneousness=true, uniqueness=false, flexibility=true
  // simultaneousness=false, uniqueness=false, flexibility=true
  const checkAvailabilityUserInput = showCheckAvailabilityUserInput && (
    <Box>checkAvailabilityUserInput</Box>
  );

  // ===================================================================================SUBITEMS LIST
  // simultaneousness=true, specific_reservation=true, flexibility=false
  // simultaneousness=true, specific_reservation=false, cyclicity=true, flexibility=false

  const toggleItemSelection = (subItem: SubItem) => {
    if (selectedSubItemsList.some((selected) => selected.id === subItem.id)) {
      setSelectedSubItemsList((prev) =>
        prev.filter((selected) => selected.id !== subItem.id),
      );
    } else {
      setSelectedSubItemsList((prev) => {
        console.log(`${b.core_config.cyclicity} here`);
        return b.core_config.cyclicity ? [subItem] : [...prev, subItem];
      });
    }
    setReservationRequestReady(
      !b.core_config.cyclicity ||
        !subItem.available_amount ||
        subItem.available_amount > userCount,
    );
  };

  const subItemsList = selectedItem && showSubItemsList && (
    <Box>
      <List>
        {selectedItem.subitem_list?.map((subItem) => (
          <ListItem
            button
            key={subItem.id}
            onClick={() => toggleItemSelection(subItem)}
            style={{
              backgroundColor: selectedSubItemsList.some(
                (i) => i.id === subItem.id,
              )
                ? "#AACCFF"
                : "white",
            }}
          >
            <ListItemText
              primary={subItem.title}
              secondary={subItem.subtitle}
              style={{
                color: selectedSubItemsList.some((i) => i.id === subItem.id)
                  ? "white"
                  : "black",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // =================================================================================== BUTTONS

  const [reservationRequestReady, setReservationRequestReady] = useState(false);
  const buttons = selectedItem && (
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
        <Button
          style={{ marginLeft: "10px" }}
          variant="contained"
          onClick={() => setSelectedItem(null)}
        >
          Back
        </Button>
      </Box>
    </Box>
  );

  const core = (
    <Box>
      {freeRangesUserInput}
      {checkAvailabilityUserInput}
      {subItemsList}
      {userAmountChoice}
      {buttons}
    </Box>
  );

  const secondScreen = selectedItem && (
    <Box padding={3}>
      <Typography variant="h3">{selectedItem.title}</Typography>
      {selectedItem.subtitle && (
        <Typography variant="h5">{selectedItem.subtitle}</Typography>
      )}
      {selectedItem.description && (
        <Typography variant="body2">{selectedItem.description}</Typography>
      )}
      {b.item_layout_config.mark_second_screen && selectedItem.mark && (
        <Ratings mark={selectedItem.mark} />
      )}
      {core}
      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
      >
        <DialogTitle>Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have selected:{" "}
            {selectedSubItemsList.map((item) => item.title).join(", ")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowSuccessDialog(false);
              setSelectedItem(null);
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

  if (selectedItem) {
    return <Box padding={3}>{secondScreen}</Box>;
  }

  const itemsList = (
    <Box>
      <List>
        {items.map((item: Item) => (
          <ListItem button key={item.id} onClick={() => handleItemSelect(item)}>
            <ListItemText primary={item.title} secondary={item.subtitle} />

            {b.item_layout_config.item_image_show && item.image && (
              <ImageS1 url={item.image} />
            )}

            {b.item_layout_config.mark_first_screen && item.mark && (
              <Ratings mark={item.mark} />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const welcomeTexts = b.userapp_layout_config.welcome_text_line1 && (
    <Box>
      <Typography variant="h6">
        {b.userapp_layout_config.welcome_text_line1}
      </Typography>
      {b.userapp_layout_config.welcome_text_line2 && (
        <Typography variant="body1" color="orange">
          {b.userapp_layout_config.welcome_text_line2}
        </Typography>
      )}
    </Box>
  );

  const firstScreen = (
    <Box>
      <Box padding={3}>
        {welcomeTexts}
        {itemsList}
        <Divider style={{ margin: "20px 0" }} />
      </Box>
    </Box>
  );

  return <Box>{firstScreen}</Box>;
}

export default UserAppInstance;
