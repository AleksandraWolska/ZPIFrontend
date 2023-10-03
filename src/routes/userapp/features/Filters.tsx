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
    <Box width="25%" padding={3}>
      <Box bgcolor="lightgrey">
        {customAttrubutesSpec
          .filter((attr: CustomAttributeSpec) => attr.isFilterable)
          .map((attr: CustomAttributeSpec) => {
            const activeFilter = activeFilters.find(
              (filter) => filter.attributeKey === attr.id.toString(),
            );

            switch (attr.dataType) {
              case "string":
                return (
                  <Box key={attr.id} marginBottom={2}>
                    <FormControl variant="outlined">
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
                        {attr.possibleValues?.map((val) => (
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
                  <Box key={attr.id} marginBottom={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!activeFilter?.value}
                          onChange={(e) => {
                            const { checked } = e.target;
                            if (checked) {
                              handleAppendFilter({
                                attributeKey: attr.id.toString(),
                                attributeName: attr.name,
                                value: checked,
                              });
                            } else {
                              handleRemoveFilter(attr.id.toString());
                            }
                          }}
                        />
                      }
                      label={attr.name}
                    />
                  </Box>
                );
              case "number":
                return (
                  <Box key={attr.id} marginBottom={2}>
                    <TextField
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
        <Button onClick={resetFilters}>Reset</Button>
      </Box>
    </Box>
  );
}

export default Filters;
