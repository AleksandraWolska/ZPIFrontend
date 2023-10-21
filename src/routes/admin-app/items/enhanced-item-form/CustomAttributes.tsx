import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CustomAttribute, CustomAttributeSpec } from "../../../../types";
import { useEnhancedItem } from "../enhanced-item-context/EnhancedItemProvider";

function CustomAttributes() {
  const { itemConfig, enhancedItem, setItemCustomAttribute } =
    useEnhancedItem();

  return (
    <Grid container spacing={1} width="50%">
      {enhancedItem.item.customAttributeList.map((attribute) => (
        <Grid key={attribute.name} item xs={12} sm={6}>
          {renderCustomAttributeInput(
            attribute,
            setItemCustomAttribute,
            itemConfig.customAttributesSpec,
          )}
        </Grid>
      ))}
    </Grid>
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
        <Select
          label={attribute.name}
          value={attribute.value}
          onChange={(e) => {
            setCustomAttribute({
              ...attribute,
              value: e.target.value as string,
            });
          }}
          fullWidth
        >
          {attributeSpec.possibleValues.map((value) => {
            return (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
      ) : (
        <TextField
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
        />
      );
    case "number":
      return (
        <TextField
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
          required={attributeSpec.isRequired}
        />
      );
    case "boolean":
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={attribute.value as boolean}
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
