import { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { FilterAlt, FilterAltOff, Close } from "@mui/icons-material";
import { jsonString } from "./mocks/json_template";
import {
  UserAppBuilderConfig,
  Item,
  FetchedJsonFirstScreen,
  FilterValues,
} from "./mocks/userapp_types";
import ImageS1 from "./features/ImageS1";
import Ratings from "./features/Ratings";
import Filters from "./features/Filters";

function UserAppFirstScreen() {
  const { appId } = useParams();
  const navigate = useNavigate();
  const jsonData: FetchedJsonFirstScreen = JSON.parse(jsonString);
  const b: UserAppBuilderConfig = jsonData.userapp_builder_config;
  const { items } = jsonData.fetched_data;

  const [showFilterForm, setShowFilterForm] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({});

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

  const resetFilters = () => {
    setActiveFilters({});
  };

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
      <Typography variant="body1" color="orange">
        {appId}
      </Typography>
      <Typography variant="h6">{b.layoutConfig.welcomeTextLine1}</Typography>
      {b.layoutConfig.welcomeTextLine2 && (
        <Typography variant="body1" color="orange">
          {b.layoutConfig.welcomeTextLine2}
        </Typography>
      )}
    </Box>
  );

  // const handleItemSelect = (item: Item) => {
  //   setSelectedItem(item);

  //   setReservationRequestReady(
  //     !c.flexibility &&
  //       !c.periodicity &&
  //       !c.specificReservation &&
  //       item.availableAmount !== undefined &&
  //       item.availableAmount > 0,
  //   );
  // };

  const itemsList = (
    <Box>
      <List>
        {filteredItems.map((item: Item) => (
          // <ListItem button key={item.id} onClick={() => handleItemSelect(item)}>
          <ListItem button key={item.id} onClick={() => navigate(`${item.id}`)}>
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

  return (
    <Box padding={3}>
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
    </Box>
  );
}

export default UserAppFirstScreen;
