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
  handleAppendFilter: (name: string, value: string | number | boolean) => void;
  handleRemoveFilter: (name: string) => void;
  resetFilters: () => void;
  filters: FilterValues;
  parameterMap: ParameterConfig[];
}

function Filters({
  handleAppendFilter,
  handleRemoveFilter,
  resetFilters,
  filters: activeFilters,
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
                <InputLabel>{param.name}</InputLabel>
                <Select
                  value={activeFilters[param.name] || ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAppendFilter(param.name, e.target.value);
                    } else {
                      handleRemoveFilter(param.name);
                    }
                  }}
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
                    checked={!!activeFilters[param.name]}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleAppendFilter(param.name, e.target.checked);
                      } else {
                        handleRemoveFilter(param.name);
                      }
                    }}
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
                value={activeFilters[param.name] || ""}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val) {
                    handleAppendFilter(param.name, val);
                  } else {
                    handleRemoveFilter(param.name);
                  }
                }}
              />
            </Box>
          );
        default:
          return null;
      }
    });

  return (
    <Box width="25%" padding={3}>
      <Box bgcolor="lightgrey">
        {FilterForm}
        <Button onClick={resetFilters}>Reset</Button>
      </Box>
    </Box>
  );
}

export default Filters;
