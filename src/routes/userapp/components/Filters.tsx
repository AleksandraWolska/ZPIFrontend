// Filters.tsx

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import { FilterValues, ParameterConfig } from "../mocks/userapp_types";

interface FiltersProps {
  handleFilterChange: (name: string, value?: string | number | boolean) => void;
  resetFilters: () => void;
  filters: FilterValues;
  parameterMap: ParameterConfig[]; // Replace with actual type
}

function Filters({
  handleFilterChange,
  resetFilters,
  filters,
  parameterMap,
}: FiltersProps) {
  const FilterForm = parameterMap
    .filter((param: ParameterConfig) => param.isFilterable)
    .map((param: ParameterConfig) => {
      switch (param.type) {
        case "string":
          return (
            <Box key={param.name} marginBottom={2}>
              <FormControl variant="outlined">
                {/* TODO if param has possible values, then select list if else input field */}
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

  return (
    <Box>
      <Box bgcolor="lightgrey">
        {FilterForm}
        <Button onClick={resetFilters}>Reset</Button>
      </Box>
    </Box>
  );
}

export default Filters;
