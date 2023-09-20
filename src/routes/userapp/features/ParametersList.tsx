import { Box, Typography } from "@mui/material";
import {
  FetchedJsonDetailsPage,
  CustomAttribute,
  ItemCustomAttribute,
} from "../mocks/types";
import { jsonStringDetailPage } from "../mocks/responseDetailPage";

const jsonData: FetchedJsonDetailsPage = JSON.parse(jsonStringDetailPage);
const parameterConfigMap: ItemCustomAttribute[] =
  jsonData.data.storeConfig.itemCustomAttributes;
type ParametersListProps = {
  itemParameters: CustomAttribute[];
};

const renderParameter = (
  paramConfig: ItemCustomAttribute,
  itemParameter: CustomAttribute,
) => {
  let displayValue;
  let style = {};

  switch (paramConfig.dataType) {
    case "string":
      displayValue = itemParameter.value;
      style = {
        backgroundColor: "yellow",
        padding: "5px",
        borderRadius: "4px",
        display: "flex",
      };
      break;
    case "boolean":
      displayValue = itemParameter.value ? "+" : "-";
      style = {
        backgroundColor: "lightGreen",
        color: "black",
        padding: "5px",
        borderRadius: "4px",
        display: "flex",
      };
      break;
    case "number":
      displayValue = `${itemParameter.value} ${paramConfig.units || ""}`;
      style = {
        backgroundColor: "lightBlue",
        color: "black",
        padding: "5px",
        borderRadius: "4px",
        display: "flex",
      };
      break;
    default:
      displayValue = itemParameter.value;
  }

  return (
    <Box key={paramConfig.name} style={style}>
      <Typography paddingRight="3px">{paramConfig.name}:</Typography>
      <Typography>{displayValue}</Typography>
    </Box>
  );
};

function ParametersList({ itemParameters }: ParametersListProps) {
  return (
    <Box width="fit-content">
      {itemParameters.map((itemParameter) => {
        const paramConfig = parameterConfigMap.find(
          (p) => p.name === itemParameter.name,
        );
        if (!paramConfig || !paramConfig.showDetailsPage) return null;

        return renderParameter(paramConfig, itemParameter);
      })}
    </Box>
  );
}

export default ParametersList;
