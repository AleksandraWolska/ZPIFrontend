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
  FilterValue,
  ParameterConfig,
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
  const [activeFilters, setActiveFilters] = useState<FilterValue[]>([]);

  const handleFilterToggle = () => setShowFilterForm((prev) => !prev);

  const handleRemoveFilter = (paramKey: string) => {
    setActiveFilters((prev) =>
      prev.filter((filter) => filter.paramKey !== paramKey),
    );
  };

  const handleAppendFilter = (newFilter: FilterValue) => {
    setActiveFilters((prev) => {
      const others = prev.filter(
        (filter) => filter.paramKey !== newFilter.paramKey,
      );
      return [...others, newFilter];
    });
  };

  const resetFilters = () => setActiveFilters([]);

  const activeFiltersList = (
    <Box display="flex" gap={1}>
      {activeFilters.map((filter) => (
        <Box
          key={filter.paramKey}
          display="flex"
          alignItems="center"
          padding={1}
          border="1px solid"
          borderRadius={3}
        >
          <Typography variant="body2">
            {filter.paramName}: {filter.value.toString()}
          </Typography>
          <Close
            style={{ marginLeft: "8px", cursor: "pointer" }}
            onClick={() => handleRemoveFilter(filter.paramKey)}
          />
        </Box>
      ))}
    </Box>
  );

  const filteredItems = items.filter((item) =>
    b.layoutConfig.parameterMap.every((param: ParameterConfig) => {
      if (!param.isFilterable) return true;

      const itemParam = item.parameters?.find((p) => p.name === param.name);
      if (!itemParam) return true;

      const filterObj = activeFilters.find(
        (f) => f.paramKey === param.id.toString(),
      );
      if (!filterObj) return true;

      return itemParam.value === filterObj.value;
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
