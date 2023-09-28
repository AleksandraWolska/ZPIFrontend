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
import { FilterValue } from "../types";

import ItemImage from "../features/ItemImage";
import Ratings from "../features/Ratings";
import Filters from "../features/Filters";
import WelcomeTexts from "../components/WelcomeTexts";
import useMainPageConfig from "./useMainPageConfig";
import useItems from "./useItems";
import { CustomAttributeSpec, Item } from "../../../types";

export default function UserAppMainPage() {
  const navigate = useNavigate();

  const storeConfig = useMainPageConfig();
  const items = useItems();

  const [showFilterForm, setShowFilterForm] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValue[]>([]);

  const handleFilterToggle = () => setShowFilterForm((prev) => !prev);

  const handleRemoveFilter = (attributeKey: string) => {
    setActiveFilters((prev) =>
      prev.filter((filter) => filter.attributeKey !== attributeKey),
    );
  };

  const handleAppendFilter = (newFilter: FilterValue) => {
    setActiveFilters((prev) => {
      const others = prev.filter(
        (filter) => filter.attributeKey !== newFilter.attributeKey,
      );
      return [...others, newFilter];
    });
  };

  const resetFilters = () => setActiveFilters([]);

  const activeFiltersList = (
    <Box display="flex" gap={1}>
      {activeFilters.map((filter) => (
        <Box
          key={filter.attributeKey}
          display="flex"
          alignItems="center"
          padding={1}
          border="1px solid"
          borderRadius={3}
        >
          <Typography variant="body2">
            {filter.attributeName}: {filter.value.toString()}
          </Typography>
          <Close
            style={{ marginLeft: "8px", cursor: "pointer" }}
            onClick={() => handleRemoveFilter(filter.attributeKey)}
          />
        </Box>
      ))}
    </Box>
  );

  const filteredItems = items.filter((item) =>
    storeConfig.customAttributesSpec.every((attr: CustomAttributeSpec) => {
      if (!attr.isFilterable) return true;

      const itemAttribute = item.customAttributeList?.find(
        (p) => p.name === attr.name,
      );
      if (!itemAttribute) return true;

      const filterObj = activeFilters.find(
        (f) => f.attributeKey === attr.id.toString(),
      );
      if (!filterObj) return true;

      return itemAttribute.value === filterObj.value;
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
            customAttrubutesSpec={storeConfig.customAttributesSpec}
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

                {item.image && <ItemImage />}

                {storeConfig.mainPage.showRating && item.mark && (
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
