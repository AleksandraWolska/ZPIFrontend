import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CustomAttribute, CustomAttributeSpec } from "../../../../types";
import { useItemForm } from "./ItemFormProvider";
import useStoreConfig from "../../store/useStoreConfig";
import StepWrapper from "../../components/StepWrapper";

function CustomAttributes() {
  const storeConfig = useStoreConfig();
  const { item, setItemCustomAttribute } = useItemForm();

  return (
    <StepWrapper>
      <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
        Custom attributes
      </Typography>

      <Box width="90%" marginTop={1.25} marginBottom={1.25}>
        <Grid container spacing={1}>
          {item.customAttributeList.map((attribute) => (
            <Grid key={attribute.name} item xs={12} sm={6}>
              {renderCustomAttributeInput(
                attribute,
                setItemCustomAttribute,
                storeConfig.customAttributesSpec,
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </StepWrapper>
  );
}

function renderCustomAttributeInput(
  attribute: CustomAttribute,
  setCustomAttribute: (attr: CustomAttribute) => void,
  customAttributesSpec: CustomAttributeSpec[],
) {
  const attributeSpec = customAttributesSpec.find(
    (spec) => spec.name === attribute.name,
  );

  if (!attributeSpec) return null;

  switch (attributeSpec.dataType) {
    case "string":
      return attributeSpec.limitValues && attributeSpec.possibleValues ? (
        <FormControl size="small" variant="outlined" fullWidth>
          <InputLabel id={attribute.name}>{attribute.name}</InputLabel>
          <Select
            variant="outlined"
            label={attribute.name}
            value={attribute.value}
            onChange={(e) => {
              setCustomAttribute({
                ...attribute,
                value: e.target.value as string,
              });
            }}
            fullWidth
            error={attributeSpec.isRequired && !attribute.value}
          >
            {attributeSpec.possibleValues.map((value) => {
              return (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : (
        <TextField
          inputProps={{ maxLength: 255 }}
          label={attribute.name}
          value={attribute.value}
          onChange={(e) =>
            setCustomAttribute({
              ...attribute,
              value: e.target.value as string,
            })
          }
          fullWidth
          required={attributeSpec.isRequired}
          error={attributeSpec.isRequired && !attribute.value}
        />
      );
    case "number":
      return (
        <TextField
          inputProps={{ maxLength: 255 }}
          label={attribute.name}
          value={attribute.value.toString()}
          onChange={(e) =>
            setCustomAttribute({
              ...attribute,
              value: parseInt(e.target.value, 10),
            })
          }
          fullWidth
          type="number"
          required={attributeSpec.isRequired && Number.isNaN(attribute.value)}
        />
      );
    case "boolean":
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={!!attribute.value}
              onChange={(e) => {
                setCustomAttribute({
                  ...attribute,
                  value: e.target.checked,
                });
              }}
            />
          }
          label={attribute.name}
        />
      );
    default:
      return null;
  }
}

export default CustomAttributes;
