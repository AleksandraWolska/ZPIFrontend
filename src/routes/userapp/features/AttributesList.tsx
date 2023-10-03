import { Box, Typography } from "@mui/material";
import { CustomAttribute, CustomAttributeSpec } from "../../../types";

type AttributesListProps = {
  itemAttributes: CustomAttribute[];
  attributesConfig: CustomAttributeSpec[];
};

const renderParameter = (
  attributesConfig: CustomAttributeSpec,
  itemAttribute: CustomAttribute,
) => {
  let displayValue;
  let style = {};

  switch (attributesConfig.dataType) {
    case "string":
      displayValue = itemAttribute.value;
      style = {
        backgroundColor: "yellow",
        padding: "5px",
        borderRadius: "4px",
        display: "flex",
      };
      break;
    case "boolean":
      displayValue = itemAttribute.value ? "+" : "-";
      style = {
        backgroundColor: "lightGreen",
        color: "black",
        padding: "5px",
        borderRadius: "4px",
        display: "flex",
      };
      break;
    case "number":
      displayValue = `${itemAttribute.value} ${attributesConfig.units || ""}`;
      style = {
        backgroundColor: "lightBlue",
        color: "black",
        padding: "5px",
        borderRadius: "4px",
        display: "flex",
      };
      break;
    default:
      displayValue = itemAttribute.value;
  }

  return (
    <Box key={attributesConfig.name} style={style}>
      <Typography paddingRight="3px">{attributesConfig.name}:</Typography>
      <Typography>{displayValue}</Typography>
    </Box>
  );
};

function AttributesList({
  itemAttributes,
  attributesConfig,
}: AttributesListProps) {
  return (
    <Box width="fit-content">
      {itemAttributes.map((itemAttribute) => {
        const currentAttrConfig = attributesConfig.find(
          (p) => p.name === itemAttribute.name,
        );
        if (!currentAttrConfig || !currentAttrConfig.showDetailsPage)
          return null;

        return renderParameter(currentAttrConfig, itemAttribute);
      })}
    </Box>
  );
}

export default AttributesList;
