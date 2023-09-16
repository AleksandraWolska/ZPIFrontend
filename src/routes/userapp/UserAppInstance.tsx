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
  IconButton,
} from "@mui/material";
import { FilterAlt, FilterAltOff, Close } from "@mui/icons-material";
import { jsonString } from "./mocks/json_template";
import {
  UserAppBuilderConfig,
  Item,
  SubItem,
  FetchedJSON,
  FilterValues,
} from "./mocks/userapp_types";
import ImageS1 from "./components/ImageS1";
import Ratings from "./components/Ratings";
import QuantityInput from "./components/CustomNumberInput";
import RatingsInteractive from "./components/RatingsInteractive";
import ParametersList from "./components/ParametersList";
import CommentList from "./components/CommentList";
import Filters from "./components/Filters";

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
    if (b.coreConfig.flexibility) {
      // flexibility is true
      if (b.coreConfig.uniqueness) {
        if (b.coreConfig.simultaneous) {
          setShowUserAmountChoice(true);
          setShowFreeRangesUserInput(true);
        } else {
          setShowFreeRangesUserInput(true);
        }
      } else {
        // uniqueness is false
        if (b.coreConfig.simultaneous) {
          setShowUserAmountChoice(true);
          setShowCheckAvailabilityUserInput(true);
        } else {
          setShowCheckAvailabilityUserInput(true);
        }
      }
    } else {
      // flexibility is false
      if (b.coreConfig.simultaneous) {
        if (b.coreConfig.specificReservation) {
          setShowSubItems(true);
        } else {
          if (b.coreConfig.periodicity) {
            setShowSubItems(true);
            setShowUserAmountChoice(true);
          } else {
            setShowUserAmountChoice(true);
          }
        }
      }
      if (b.coreConfig.periodicity) {
        setShowSubItems(true);
      } else {
        //
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
        console.log(`${b.coreConfig.periodicity} here`);
        return b.coreConfig.periodicity ? [subItem] : [...prev, subItem];
      });
    }
    setReservationRequestReady(
      !b.coreConfig.periodicity ||
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

  // ========================================================================================FILTERS SECTION

  const [showFilterForm, setShowFilterForm] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});

  const handleFilterToggle = () => {
    setShowFilterForm((prev) => !prev);
  };

  const activeFilters = (
    <Box display="flex" gap={1}>
      {Object.entries(filters).map(([name, value]) => (
        <Box
          key={name}
          display="flex"
          alignItems="center"
          padding={1}
          border="1px solid"
          borderRadius={3}
        >
          <Typography variant="body2">
            {name}: {value.toString()}
          </Typography>
          <Close
            style={{ marginLeft: "8px", cursor: "pointer" }}
            onClick={() => handleFilterChange(name)}
          />
        </Box>
      ))}
    </Box>
  );

  const handleFilterChange = (
    name: string,
    value?: string | number | boolean,
  ) => {
    if (value === undefined || value === "") {
      setFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters[name];
        return newFilters;
      });
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetFilters = () => {
    setFilters({});
  };

  const filteredItems = items.filter((item) => {
    return b.layoutConfig.parameterMap.every((param) => {
      if (!param.isFilterable) return true;

      const itemParam = item.parameters?.find((p) => p.name === param.name);
      if (!itemParam) return true;

      const filterValue = filters[param.name];
      if (filterValue === undefined || filterValue === "") return true;

      return itemParam.value === filterValue;
    });
  });

  // ========================================================================================STARS SECTION
  // TODO user should set rating only once. when user sets rating the reuest to backend is proceeded with userid, if returns that user
  // hasnt yet rated, then success, else failed
  const handleRatingAdd = (rating: number) => {
    console.log("New Rating:", rating);
  };

  const ratings = b.itemConfig.showRatingSecondScreen && selectedItem && (
    <RatingsInteractive handleSetRating={handleRatingAdd} />
  );

  // ===================================================================================== COMMENT SECTION

  const [userComment, setUserComment] = useState(""); // to manage the state of the comment input

  const handleSendComment = () => {
    // TODO: Send to backend and then reload?
    // mock logic below
    if (
      userComment.trim() !== "" &&
      selectedItem &&
      selectedItem.comment_list
    ) {
      const newComment = {
        id: Math.random() * 1000,
        userId: Math.random() * 1000,
        nickname: "YourNickname",
        datetime: new Date().toISOString(),
        content: userComment,
      };
      selectedItem.comment_list.unshift(newComment);
      setUserComment("");
    }
    console.log(userComment);
  };

  const core = (
    <Box>
      {freeRangesUserInput}
      {checkAvailabilityUserInput}
      {subItemsList}
      {userAmountChoice}
      {buttons}
      {ratings}
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
      {b.itemConfig.showRatingSecondScreen && selectedItem.mark && (
        <Ratings mark={selectedItem.mark} />
      )}
      <ParametersList builderConfig={b} selectedItem={selectedItem} />
      {core}
      {/* CommentList Component */}
      {b.itemConfig.commentSection && selectedItem.comment_list && (
        <CommentList
          selectedItem={selectedItem}
          userComment={userComment}
          handleSendComment={handleSendComment}
          setUserComment={setUserComment}
        />
      )}
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
        {filteredItems.map((item: Item) => (
          <ListItem button key={item.id} onClick={() => handleItemSelect(item)}>
            <ListItemText primary={item.title} secondary={item.subtitle} />

            {b.itemConfig.showItemImageFirstScreen && item.image && (
              <ImageS1 url={item.image} />
            )}

            {b.itemConfig.showRatingFirstScreen && item.mark && (
              <Ratings mark={item.mark} />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const welcomeTexts = b.layoutConfig.welcomeTextLine1 && (
    <Box>
      <Typography variant="h6">{b.layoutConfig.welcomeTextLine1}</Typography>
      {b.layoutConfig.welcomeTextLine2 && (
        <Typography variant="body1" color="orange">
          {b.layoutConfig.welcomeTextLine2}
        </Typography>
      )}
    </Box>
  );

  const firstScreen = (
    <Box display="flex" justifyContent="space-between">
      {showFilterForm && (
        <Box width="25%" padding={3}>
          <Filters
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters}
            filters={filters}
            parameterMap={b.layoutConfig.parameterMap}
          />
        </Box>
      )}
      <Box width="75%" padding={3}>
        {welcomeTexts}
        <IconButton onClick={handleFilterToggle}>
          {showFilterForm ? <FilterAltOff /> : <FilterAlt />}
        </IconButton>
        {activeFilters}
        {itemsList}
        <Divider style={{ margin: "20px 0" }} />
      </Box>
    </Box>
  );

  return <Box>{firstScreen}</Box>;
}

export default UserAppInstance;
