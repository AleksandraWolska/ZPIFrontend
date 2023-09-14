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
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { FilterAlt, FilterAltOff, Close } from "@mui/icons-material";
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
import RatingsInteractive from "./components/RatingsInteractive";

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

  // ===================================================================================== PARAMETERS SECTION

  const shouldShowParameters = b.layoutConfig.parameterMap.some(
    (param) => param.showSecondScreen,
  );

  const parametersList = shouldShowParameters &&
    selectedItem &&
    selectedItem.parameters && (
      <Box width="fit-content">
        {b.layoutConfig.parameterMap.map((paramConfig) => {
          const parameter = selectedItem.parameters?.find(
            (p) => p.name === paramConfig.name,
          );

          if (!parameter) return null;

          let displayValue;
          let style = {};

          switch (paramConfig.type) {
            case "string":
              displayValue = parameter.value;
              style = {
                backgroundColor: "yellow",
                padding: "5px",
                borderRadius: "4px",
                display: "flex",
              };
              break;
            case "boolean":
              displayValue = parameter.value ? "+" : "-";
              style = {
                backgroundColor: "lightGreen",
                color: "black",
                padding: "5px",
                borderRadius: "4px",
                display: "flex",
              };
              break;
            case "number":
              displayValue = `${parameter.value} ${paramConfig.units || ""}`;
              style = {
                backgroundColor: "lightBlue",
                color: "black",
                padding: "5px",
                borderRadius: "4px",
                display: "flex",
              };
              break;
            default:
              displayValue = parameter.value;
          }

          return (
            <Box style={style}>
              <Typography paddingRight="3px">{paramConfig.name}:</Typography>
              <Typography>{displayValue}</Typography>
            </Box>
          );
        })}
      </Box>
    );

  // ========================================================================================FILTERS SECTION
  type FilterValues = {
    [key: string]: string | number | boolean;
  };
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

  const FilterForm = b.layoutConfig.parameterMap
    .filter((param) => param.isFilterable)
    .map((param) => {
      switch (param.type) {
        case "string":
          return (
            <Box key={param.name} marginBottom={2}>
              <FormControl variant="outlined">
                <InputLabel>{param.name}</InputLabel>
                <Select
                  value={filters[param.name] || ""}
                  onChange={(e) =>
                    handleFilterChange(param.name, e.target.value)
                  }
                  label={param.name}
                >
                  {param.possibleValues?.map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          );
        case "boolean":
          return (
            <Box key={param.name} marginBottom={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!filters[param.name]}
                    onChange={(e) =>
                      handleFilterChange(param.name, e.target.checked)
                    }
                  />
                }
                label={param.name}
              />
            </Box>
          );
        case "number":
          return (
            <Box key={param.name} marginBottom={2}>
              <TextField
                type="number"
                label={param.name}
                variant="outlined"
                value={filters[param.name] || ""}
                onChange={(e) =>
                  handleFilterChange(param.name, Number(e.target.value))
                }
              />
            </Box>
          );
        default:
          return null;
      }
    });

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

  const filtersBox = (
    <Box>
      {showFilterForm && (
        <Box bgcolor="lightgrey">
          {FilterForm}
          <Button onClick={resetFilters}>Reset</Button>
        </Box>
      )}
    </Box>
  );

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
  const commentList = b.itemConfig.commentSection &&
    selectedItem &&
    selectedItem.comment_list && (
      <div>
        {/* Input for current user's comment */}
        <Paper style={{ padding: 15, marginBottom: 15 }}>
          <TextField
            fullWidth
            label="Your Comment"
            variant="outlined"
            multiline
            rows={2}
            placeholder="Enter your comment here..."
            value={userComment} // set value to userComment
            onChange={(e) => setUserComment(e.target.value)} // update userComment state on change
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 10 }}
            onClick={handleSendComment}
          >
            Send
          </Button>
        </Paper>

        {/* List of comments */}
        <List>
          {selectedItem.comment_list.map((comment) => (
            <Paper style={{ padding: 15, marginBottom: 15 }}>
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemText
                  primary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body1"
                        color="textPrimary"
                      >
                        {comment.nickname}
                      </Typography>
                      {` — ${new Date(comment.datetime).toLocaleDateString(
                        undefined,
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}`}
                    </>
                  }
                  secondary={comment.content}
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      </div>
    );

  const core = (
    <Box>
      {parametersList}
      {freeRangesUserInput}
      {checkAvailabilityUserInput}
      {subItemsList}
      {userAmountChoice}
      {buttons}
      {ratings}
      {commentList}
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
          {filtersBox}
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
