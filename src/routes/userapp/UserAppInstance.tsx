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

function UserAppInstance() {
  const jsonData: FetchedJSON = JSON.parse(jsonString);
  const b: UserAppBuilderConfig = jsonData.userapp_builder_config;
  const { items } = jsonData.fetched_data;

  const basicActionButtons = (
    <Box>
      <Box marginTop={2}>
        <Button
          style={{ marginLeft: "10px" }}
          variant="contained"
          onClick={() => setSelectedItem(null)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowSuccessDialog(true)}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedSubItemsList, setSelectedSubItemsList] = useState<SubItem[]>(
    [],
  );

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const toggleItemSelection = (subItem: SubItem) => {
    if (selectedSubItemsList.some((selected) => selected.id === subItem.id)) {
      setSelectedSubItemsList((prev) =>
        prev.filter((selected) => selected.id !== subItem.id),
      );
    } else {
      setSelectedSubItemsList((prev) => [...prev, subItem]);
    }
  };

  const [showUserAmountChoice, setShowUserAmountChoice] = useState(false);
  const [showFreeRangesUserInput, setShowFreeRangesUserInput] = useState(false);
  const [showCheckAvailabilityUserInput, setShowCheckAvailabilityUserInput] =
    useState(false);
  const [showSubItemsList, setShowSubItems] = useState(false);

  const handleItemSelect = (item: Item) => {
    if (!b.core_config.flexibility) {
      if (!b.core_config.simultaneousness) {
        // do nothing
      } else {
        if (!b.core_config.specific_reservation) {
          if (!b.core_config.cyclicity) {
            setShowUserAmountChoice(true);
          } else {
            setShowSubItems(true);
            // renderSubitems(b.core_config.specific_reservation); // itemy w innych datach jako subitemy
            setShowUserAmountChoice(true);
          }
        } else {
          setShowSubItems(true);
        }
      }
    } else {
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
    }
    setSelectedItem(item);
  };

  const userAmountChoice = <Box> userAmountChoice </Box>;
  const freeRangesUserInput = <Box>freeRangesUserInput </Box>;
  const checkAvailabilityUserInput = <Box>checkAvailabilityUserInput</Box>;
  const subItemsList = <Box>Subitems</Box>;

  const core = (
    <Box>
      {showUserAmountChoice && userAmountChoice}
      {showFreeRangesUserInput && freeRangesUserInput}
      {showCheckAvailabilityUserInput && checkAvailabilityUserInput}
      {showSubItemsList && subItemsList}
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
      {core}
    </Box>
  );

  if (selectedItem) {
    return (
      <Box padding={3}>
        {secondScreen}
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="body1" color="orange">
          User can choose multiple elements from list.
        </Typography>
        <Typography variant="h6">{selectedItem.title}</Typography>
        <Typography variant="h5">{selectedItem.subtitle}</Typography>
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
        <Box marginTop={2}>
          <Button
            variant="contained"
            color="primary"
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
        <Divider style={{ margin: "20px 0" }} />
        {itemsList}
      </Box>
    </Box>
  );

  return <Box>{firstScreen}</Box>;
}

export default UserAppInstance;
