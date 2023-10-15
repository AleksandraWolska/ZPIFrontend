import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { CustomAttributeSpec } from "../../../types";
import { FilterValue } from "../types";

type FiltersProps = {
  handleAppendFilter: (filter: FilterValue) => void;
  handleRemoveFilter: (attrKey: string) => void;
  resetFilters: () => void;
  activeFilters: FilterValue[];
  customAttrubutesSpec: CustomAttributeSpec[];
};

function Filters({
  handleAppendFilter,
  handleRemoveFilter,
  resetFilters,
  activeFilters,
  customAttrubutesSpec,
}: FiltersProps) {
  return (
    <Box
      padding={2}
      width="100%"
      bgcolor="white"
      boxShadow={3}
      borderRadius="10px"
    >
      {customAttrubutesSpec
        .filter((attr: CustomAttributeSpec) => attr.isFilterable)
        .map((attr: CustomAttributeSpec) => {
          const activeFilter = activeFilters.find(
            (filter) => filter.attributeKey === attr.id.toString(),
          );

          switch (attr.dataType) {
            case "string":
              if (attr.possibleValues && attr.possibleValues.length > 0) {
                return (
                  <Box key={attr.id} marginBottom={2}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>{attr.name}</InputLabel>
                      <Select
                        value={activeFilter?.value || ""}
                        onChange={(e) => {
                          const { value } = e.target;
                          if (value) {
                            handleAppendFilter({
                              attributeKey: attr.id.toString(),
                              attributeName: attr.name,
                              value,
                            });
                          } else {
                            handleRemoveFilter(attr.id.toString());
                          }
                        }}
                        label={attr.name}
                      >
                        {attr.possibleValues.map((val) => (
                          <MenuItem key={val} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                );
              }
              return (
                <Box key={attr.id} marginBottom={2}>
                  <TextField
                    fullWidth
                    label={attr.name}
                    variant="outlined"
                    value={activeFilter?.value || ""}
                    onChange={(e) => {
                      const { value } = e.target;
                      if (value) {
                        handleAppendFilter({
                          attributeKey: attr.id.toString(),
                          attributeName: attr.name,
                          value,
                        });
                      } else {
                        handleRemoveFilter(attr.id.toString());
                      }
                    }}
                  />
                </Box>
              );

            case "number":
              return (
                <Box key={attr.id} marginBottom={2}>
                  <TextField
                    fullWidth
                    type="number"
                    label={attr.name}
                    variant="outlined"
                    value={activeFilter?.value || ""}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val || val === 0) {
                        handleAppendFilter({
                          attributeKey: attr.id.toString(),
                          attributeName: attr.name,
                          value: val,
                        });
                      } else {
                        handleRemoveFilter(attr.id.toString());
                      }
                    }}
                  />
                </Box>
              );
            default:
              return null;
          }
        })}
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={resetFilters}
          fullWidth
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}

export default Filters;
