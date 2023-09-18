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
import { FilterValue, ParameterConfig } from "../mocks/userapp_types";

type FiltersProps = {
  handleAppendFilter: (filter: FilterValue) => void;
  handleRemoveFilter: (paramKey: string) => void;
  resetFilters: () => void;
  activeFilters: FilterValue[];
  parameterMap: ParameterConfig[];
};

function Filters({
  handleAppendFilter,
  handleRemoveFilter,
  resetFilters,
  activeFilters,
  parameterMap,
}: FiltersProps) {
  return (
    <Box width="25%" padding={3}>
      <Box bgcolor="lightgrey">
        {parameterMap
          .filter((param: ParameterConfig) => param.isFilterable)
          .map((param: ParameterConfig) => {
            const activeFilter = activeFilters.find(
              (filter) => filter.paramKey === param.id.toString(),
            );

            switch (param.type) {
              case "string":
                return (
                  <Box key={param.id} marginBottom={2}>
                    <FormControl variant="outlined">
                      <InputLabel>{param.name}</InputLabel>
                      <Select
                        value={activeFilter?.value || ""}
                        onChange={(e) => {
                          const { value } = e.target;
                          if (value) {
                            handleAppendFilter({
                              paramKey: param.id.toString(),
                              paramName: param.name,
                              value,
                            });
                          } else {
                            handleRemoveFilter(param.id.toString());
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
                  <Box key={param.id} marginBottom={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!activeFilter?.value}
                          onChange={(e) => {
                            const { checked } = e.target;
                            if (checked) {
                              handleAppendFilter({
                                paramKey: param.id.toString(),
                                paramName: param.name,
                                value: checked,
                              });
                            } else {
                              handleRemoveFilter(param.id.toString());
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
                  <Box key={param.id} marginBottom={2}>
                    <TextField
                      type="number"
                      label={param.name}
                      variant="outlined"
                      value={activeFilter?.value || ""}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val || val === 0) {
                          handleAppendFilter({
                            paramKey: param.id.toString(),
                            paramName: param.name,
                            value: val,
                          });
                        } else {
                          handleRemoveFilter(param.id.toString());
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
