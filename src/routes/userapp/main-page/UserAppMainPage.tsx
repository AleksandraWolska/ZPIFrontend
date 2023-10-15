import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  IconButton,
} from "@mui/material";
import { FilterAlt, FilterAltOff, Close } from "@mui/icons-material";
import { CustomAttributeSpec, CustomAttribute } from "../../../types";
import { FilterValue } from "../types";
import useMainPageConfig from "./useMainPageConfig";
import useItems from "./useItems";
import Filters from "../features/Filters";
import WelcomeTexts from "../components/WelcomeTexts";
import ItemListElement from "./ItemListElement";

export default function UserAppMainPage() {
  const navigate = useNavigate();

  const storeConfig = useMainPageConfig();
  const itemInfos = useItems();

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
    <Box display="flex" margin={1} marginLeft={2} gap={1}>
      {activeFilters.map((filter) => (
        <Box
          key={filter.attributeKey}
          display="flex"
          alignItems="center"
          padding={1}
          borderRadius="10px"
          bgcolor="white"
          boxShadow={2}
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

  const filteredItemInfos = itemInfos.filter((itemInfo) =>
    storeConfig.customAttributesSpec.every((attr: CustomAttributeSpec) => {
      if (!attr.isFilterable) return true;

      const itemAttribute = itemInfo.item.customAttributeList.find(
        (p: CustomAttribute) => p.name === attr.name,
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
        <Box
          // width={showFilterForm ? "25%" : "0"}
          // display={showFilterForm ? "inline-block" : "none"}
          sx={{
            transition: "width 0.3s ease-in-out",
            width: showFilterForm ? "25%" : "0",
          }}
        >
          {showFilterForm && (
            <Filters
              handleAppendFilter={handleAppendFilter}
              handleRemoveFilter={handleRemoveFilter}
              resetFilters={resetFilters}
              activeFilters={activeFilters}
              customAttrubutesSpec={storeConfig.customAttributesSpec}
            />
          )}
        </Box>

        <Box
          sx={{
            transition: "width 0.3s ease-in-out",
          }}
          width={showFilterForm ? "75%" : "100%"}
          padding={3}
        >
          <WelcomeTexts config={storeConfig.mainPage} />

          <IconButton onClick={handleFilterToggle}>
            {showFilterForm ? <FilterAltOff /> : <FilterAlt />}
          </IconButton>

          {activeFiltersList}

          <List>
            {filteredItemInfos.map((itemInfo) => {
              const isAvailable = itemInfo.itemStatus.availableAmount !== 0;
              return (
                <ListItem
                  key={itemInfo.item.id}
                  onClick={
                    isAvailable
                      ? () => navigate(`${itemInfo.item.id}`)
                      : undefined
                  }
                  style={{
                    cursor: isAvailable ? "pointer" : "default",
                  }}
                >
                  <ItemListElement config={storeConfig} itemInfo={itemInfo} />
                </ListItem>
              );
            })}
          </List>

          <Divider style={{ margin: "20px 0" }} />
        </Box>
      </Box>
    </Box>
  );
}
