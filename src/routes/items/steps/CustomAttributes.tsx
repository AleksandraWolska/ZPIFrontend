import {
  Box,
  Checkbox,
  FormControlLabel,
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
  const customAttributesSpec = useNewItem();

  console.log(newItem);

  return (
    <>
      {newItem.customAttributeList &&
        newItem.customAttributeList.map((attribute) => (
          <Box key={attribute.name}>
            {renderCustomAttributeInput(
              attribute,
              setCustomAttribute,
              customAttributesSpec,
            )}
          </Box>
        ))}

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
