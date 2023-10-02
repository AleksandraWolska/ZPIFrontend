import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { NewItem } from "../types";
import useNewItem from "../useNewItem";
import {
  CustomAttribute,
  CustomAttributeSpec,
} from "../../userapp/mocks/types";

function CustomAttributes({
  newItem,
  setCustomAttribute,
  goNext,
  goPrev,
}: {
  newItem: NewItem;
  setCustomAttribute: (attr: CustomAttribute) => void;
  goNext: () => void;
  goPrev: () => void;
}) {
  const { customAttributesSpec } = useNewItem();

  return (
    <>
      {newItem.customAttributeList && (
        <Grid container spacing={1} width="50%">
          {newItem.customAttributeList.map((attribute) => (
            <Grid key={attribute.name} item xs={12} sm={6}>
              {renderCustomAttributeInput(
                attribute,
                setCustomAttribute,
                customAttributesSpec,
              )}
            </Grid>
          ))}
        </Grid>
      )}

      <button type="button" onClick={goPrev}>
        Prev
      </button>
      <button type="button" onClick={goNext}>
        Next
      </button>
    </>
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
              name: attribute.name,
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
              name: attribute.name,
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
          value={attribute.value}
          onChange={(e) =>
            setCustomAttribute({
              name: attribute.name,
              value: Number(e.target.value),
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
                  name: attribute.name,
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
