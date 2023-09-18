import { useState } from "react";
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
import WelcomeTexts from "./components/WelcomeTexts";

export default function UserAppMainPage() {
  const navigate = useNavigate();

  const jsonData: FetchedJsonFirstScreen = JSON.parse(jsonString);
  const b: UserAppBuilderConfig = jsonData.userapp_builder_config;
  const { items } = jsonData.fetched_data;

  const [showFilterForm, setShowFilterForm] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({});

  const handleFilterToggle = () => setShowFilterForm((prev) => !prev);

  const handleRemoveFilter = (name: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[name];
      return newFilters;
    });
  };

  const handleAppendFilter = (
    name: string,
    value: string | number | boolean,
  ) => {
    setActiveFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => setActiveFilters({});

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
            onClick={() => handleRemoveFilter(name)}
          />
        </Box>
      ))}
    </Box>
  );

  const filteredItems = items.filter((item) =>
    b.layoutConfig.parameterMap.every((param) => {
      if (!param.isFilterable) return true;

      const itemParam = item.parameters?.find((p) => p.name === param.name);
      if (!itemParam) return true;

      const filterValue = activeFilters[param.name];
      if (filterValue === undefined || filterValue === "") return true;

      return itemParam.value === filterValue;
    }),
  );

  return (
    <Box padding={3}>
      <Box display="flex" justifyContent="space-between">
        {showFilterForm && (
          <Filters
            handleAppendFilter={handleAppendFilter}
            handleRemoveFilter={handleRemoveFilter}
            resetFilters={resetFilters}
            activeFilters={activeFilters}
            parameterMap={b.layoutConfig.parameterMap}
          />
        )}

        <Box width="75%" padding={3}>
          <WelcomeTexts />

          <IconButton onClick={handleFilterToggle}>
            {showFilterForm ? <FilterAltOff /> : <FilterAlt />}
          </IconButton>

          {activeFiltersList}

          <List>
            {filteredItems.map((item: Item) => (
              <ListItem key={item.id} onClick={() => navigate(`${item.id}`)}>
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

          <Divider style={{ margin: "20px 0" }} />
        </Box>
      </Box>
    </Box>
  );
}
