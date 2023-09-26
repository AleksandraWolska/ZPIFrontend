import { Box, Typography } from "@mui/material";
import {
  FetchedJsonDetailsPage,
  CustomAttribute,
  CustomAttributeSpec,
} from "../mocks/types";
import { jsonStringDetailPage } from "../mocks/responseDetailPage";

const jsonData: FetchedJsonDetailsPage = JSON.parse(jsonStringDetailPage);
const { customAttributesSpec } = jsonData.data.storeConfig;
type AttributesListProps = {
  itemAttributes: CustomAttribute[];
};

const renderParameter = (
  attributeConfig: CustomAttributeSpec,
  itemAttribute: CustomAttribute,
) => {
  let displayValue;
  let style = {};

  switch (attributeConfig.dataType) {
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
      displayValue = `${itemAttribute.value} ${attributeConfig.units || ""}`;
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
    <Box key={attributeConfig.name} style={style}>
      <Typography paddingRight="3px">{attributeConfig.name}:</Typography>
      <Typography>{displayValue}</Typography>
    </Box>
  );
};

function AttributesList({ itemAttributes }: AttributesListProps) {
  return (
    <Box width="fit-content">
      {itemAttributes.map((itemAttribute) => {
        const paramConfig = customAttributesSpec.find(
          (p) => p.name === itemAttribute.name,
        );
        if (!paramConfig || !paramConfig.showDetailsPage) return null;

        return renderParameter(paramConfig, itemAttribute);
      })}
    </Box>
  );
}

export default AttributesList;
