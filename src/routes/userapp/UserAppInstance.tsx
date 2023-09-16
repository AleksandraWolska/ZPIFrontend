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
  CoreConfig,
} from "./mocks/userapp_types";
import ImageS1 from "./components/ImageS1";
import Ratings from "./components/Ratings";
import QuantityInput from "./components/CustomNumberInput";
import RatingsInteractive from "./components/RatingsInteractive";
import ParametersList from "./components/ParametersList";
import CommentList from "./components/CommentList";
import Filters from "./components/Filters";
import SubItemsList from "./components/SubItemsList";

function UserAppInstance() {
  const jsonData: FetchedJSON = JSON.parse(jsonString);
  const b: UserAppBuilderConfig = jsonData.userapp_builder_config;
  const c: CoreConfig = b.coreConfig;

  const { items } = jsonData.fetched_data;
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedSubItemsList, setSelectedSubItemsList] = useState<SubItem[]>(
    [],
  );
  const [reservationRequestReady, setReservationRequestReady] = useState(false);
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({});
  const [userCount, setUserCount] = useState(1);

  const handleRatingAdd = (rating: number) => {
    console.log("New Rating:", rating);
  };

  const handleUserCountInputChange = (newValue: number) => {
    setReservationRequestReady(
      selectedSubItemsList.length > 0 &&
        selectedSubItemsList[0]!.available_amount! >= newValue,
    );

    if (newValue > userCount) {
      //
    } else if (newValue < userCount) {
      //
    } else {
      console.log("Value unchanged");
    }
    setUserCount(newValue || 1);
  };

  const handleFilterToggle = () => {
    setShowFilterForm((prev) => !prev);
  };

  const handleFilterChange = (
    name: string,
    value?: string | number | boolean,
  ) => {
    if (value === undefined || value === "") {
      setActiveFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters[name];
        return newFilters;
      });
    } else {
      setActiveFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSendComment = (content: string) => {
    const newComment = {
      id: Math.random() * 1000,
      userId: Math.random() * 1000,
      nickname: "YourNickname",
      datetime: new Date().toISOString(),
      content,
    };

    if (selectedItem?.comment_list) {
      setSelectedItem({
        ...selectedItem,
        comment_list: [newComment, ...selectedItem.comment_list],
      });
    }

    console.log(content);
  };
  const resetFilters = () => {
    setActiveFilters({});
  };

  const toggleItemSelection = (subItem: SubItem) => {
    if (selectedSubItemsList.some((selected) => selected.id === subItem.id)) {
      setSelectedSubItemsList((prev) =>
        prev.filter((selected) => selected.id !== subItem.id),
      );
    } else {
      setSelectedSubItemsList((prev) => {
        console.log(`${c.periodicity} here`);
        return c.periodicity ? [subItem] : [...prev, subItem];
      });
    }
    setReservationRequestReady(
      !c.periodicity ||
        !subItem.available_amount ||
        subItem.available_amount > userCount,
    );
  };

  const userAmountChoice = (
    <Box>
      <QuantityInput
        disabled={selectedSubItemsList.length === 0}
        value={userCount}
        onUserCountChange={(value: number) => handleUserCountInputChange(value)}
      />
    </Box>
  );

  const freeRangesUserInput = <Box>freeRangesUserInput </Box>;

  const checkAvailabilityUserInput = <Box>checkAvailabilityUserInput</Box>;

  const subItemsList = selectedItem && (
    <SubItemsList
      selectedItem={selectedItem}
      selectedSubItemsList={selectedSubItemsList}
      toggleItemSelection={toggleItemSelection}
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
  );
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

  const activeFiltersList = (
    <Box display="flex" gap={1}>
      {Object.entries(activeFilters).map(([name, value]) => (
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

  const filteredItems = items.filter((item) => {
    return b.layoutConfig.parameterMap.every((param) => {
      if (!param.isFilterable) return true;

      const itemParam = item.parameters?.find((p) => p.name === param.name);
      if (!itemParam) return true;

      const filterValue = activeFilters[param.name];
      if (filterValue === undefined || filterValue === "") return true;

      return itemParam.value === filterValue;
    });
  });

  const filters = showFilterForm && (
    <Filters
      handleFilterChange={handleFilterChange}
      resetFilters={resetFilters}
      filters={activeFilters}
      parameterMap={b.layoutConfig.parameterMap}
    />
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

  const ratingsInteractive = b.itemConfig.showRatingSecondScreen &&
    selectedItem && <RatingsInteractive handleSetRating={handleRatingAdd} />;

  const core = (
    <Box>
      {c.flexibility &&
        ((c.uniqueness && !c.simultaneous) || !c.uniqueness) &&
        freeRangesUserInput}
      {c.flexibility &&
        !c.uniqueness &&
        c.simultaneous &&
        checkAvailabilityUserInput}
      {!c.flexibility &&
        ((c.simultaneous && (c.specificReservation || c.periodicity)) ||
          c.periodicity) &&
        subItemsList}
      {(c.flexibility && c.simultaneous) ||
        (!c.flexibility &&
          ((c.simultaneous && !c.specificReservation) ||
            (!c.simultaneous && c.periodicity)) &&
          userAmountChoice)}
      {buttons}
    </Box>
  );

  const itemsList = (
    <Box>
      <List>
        {filteredItems.map((item: Item) => (
          <ListItem button key={item.id} onClick={() => setSelectedItem(item)}>
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

  const firstScreen = (
    <Box display="flex" justifyContent="space-between">
      {filters}
      <Box width="75%" padding={3}>
        {welcomeTexts}
        <IconButton onClick={handleFilterToggle}>
          {showFilterForm ? <FilterAltOff /> : <FilterAlt />}
        </IconButton>
        {activeFiltersList}
        {itemsList}
        <Divider style={{ margin: "20px 0" }} />
      </Box>
    </Box>
  );

  const ratings = b.itemConfig.showRatingSecondScreen &&
    selectedItem &&
    selectedItem.mark && <Ratings mark={selectedItem.mark} />;

  const commentList = b.itemConfig.commentSection &&
    selectedItem &&
    selectedItem.comment_list && (
      <CommentList
        selectedItem={selectedItem}
        handleSendComment={handleSendComment}
      />
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
      {ratings}
      <ParametersList
        parameterConfigMap={b.layoutConfig.parameterMap}
        selectedItem={selectedItem}
      />
      {core}
      {ratingsInteractive}
      {commentList}
      {dialog}
    </Box>
  );

  return <Box padding={3}>{selectedItem ? secondScreen : firstScreen}</Box>;
}

export default UserAppInstance;
