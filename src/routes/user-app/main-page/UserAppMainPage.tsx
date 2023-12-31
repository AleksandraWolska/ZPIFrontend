import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Collapse,
} from "@mui/material";

import { FilterAlt, FilterAltOff, Close, SwapVert } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { CustomAttributeSpec, CustomAttribute, Item } from "../../../types";
import { FilterValue } from "../types";
import useItems from "./useItems";
import Filters from "../components/main-page-specific/Filters";
import WelcomeTexts from "../components/main-page-specific/WelcomeTexts";
import ItemListElement from "../components/main-page-specific/ItemListElement";
import useStoreConfig from "../wrapper/useStoreConfig";

export default function UserAppMainPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const storeConfig = useStoreConfig();
  const fetchedItems = useItems();

  // if there is no field amount/available amount, then pass, but if any of them is equal to 0, then filterout
  const items = fetchedItems.filter(
    (item) =>
      (!("availableAmount" in item) && !("amount" in item)) ||
      (item.availableAmount && item.availableAmount !== 0) ||
      (item.amount && item.amount !== 0),
  );

  const [showFilterForm, setShowFilterForm] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValue[]>([]);

  const [sortCriteria, setSortCriteria] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const filters = (
    <Filters
      handleAppendFilter={handleAppendFilter}
      handleRemoveFilter={handleRemoveFilter}
      resetFilters={resetFilters}
      activeFilters={activeFilters}
      customAttrubutesSpec={storeConfig.customAttributesSpec}
    />
  );

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

  const filteredItems = items.filter((item) =>
    storeConfig.customAttributesSpec.every((attr: CustomAttributeSpec) => {
      if (!attr.isFilterable) return true;

      const itemAttribute = item.customAttributeList.find(
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

  const sortedItemInfos = filteredItems.sort((a: Item, b: Item) => {
    let valueA;
    let valueB;
    if (sortCriteria === "title") {
      valueA = a.attributes[sortCriteria];
      valueB = b.attributes[sortCriteria];
    } else if (sortCriteria === "mark" || sortCriteria === "availableAmount") {
      valueA = a[sortCriteria] || 0;
      valueB = b[sortCriteria] || 0;
    } else {
      valueA = a.attributes.title;
      valueB = b.attributes.title;
    }

    if (sortOrder === "asc") {
      return valueA > valueB ? 1 : -1;
    }
    return valueA < valueB ? 1 : -1;
  });

  return (
    <Box padding={1}>
      <Box display="flex" justifyContent="space-between">
        <Box
          sx={{
            transition: "width 0.3s ease-in-out",
            width: showFilterForm ? "25%" : "0",
            "@media (max-width: 800px)": {
              display: "none",
            },
          }}
        >
          {showFilterForm && filters}
        </Box>
        <Box
          sx={{
            transition: "width 0.3s ease-in-out",
            width: showFilterForm ? "75%" : "100%",
            "@media (max-width: 800px)": {
              width: "100%",
            },
          }}
          padding={3}
        >
          <WelcomeTexts config={storeConfig.mainPage} />
          <Box display="flex" justifyContent="space-between" padding="10px">
            <IconButton onClick={handleFilterToggle}>
              {showFilterForm ? <FilterAltOff /> : <FilterAlt />}
            </IconButton>
            <Box display="flex" alignItems="center">
              <FormControl size="small" style={{ marginRight: 8 }}>
                <InputLabel id="sort-criteria-select-label">
                  {t("user.main.sortBy")}
                </InputLabel>
                <Select
                  labelId="sort-criteria-select-label"
                  id="sort-criteria-select"
                  value={sortCriteria}
                  label={t("user.main.sortBy")}
                  onChange={(e) => setSortCriteria(e.target.value)}
                >
                  <MenuItem value="title">{t("user.main.title")}</MenuItem>
                  <MenuItem value="availableAmount">
                    {t("user.main.availableAmount")}
                  </MenuItem>
                  {storeConfig.mainPage.showRating &&
                    !(
                      !storeConfig.core.flexibility &&
                      !storeConfig.core.periodicity
                    ) && (
                      <MenuItem value="mark">{t("user.main.rating")}</MenuItem>
                    )}
                </Select>
              </FormControl>
              <IconButton
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                <SwapVert />
              </IconButton>
            </Box>
          </Box>
          {activeFiltersList}
          <Box
            sx={{
              transition: "width 0.3s ease-in-out",
              width: "100%",
              "@media (min-width: 800px)": {
                display: "none",
              },
            }}
          >
            <Collapse in={showFilterForm}>{showFilterForm && filters}</Collapse>
          </Box>
          {sortedItemInfos.length === 0 && (
            <Typography m={2} variant="overline">
              {t("user.main.noItemsAvailable")}
            </Typography>
          )}
          <List>
            {sortedItemInfos.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  onClick={() => navigate(`${item.id}`)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <ItemListElement config={storeConfig} item={item} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
