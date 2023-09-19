import { Box, Typography } from "@mui/material";
import {
  FetchedJsonSecondScreen,
  Parameter,
  ParameterConfig,
} from "../mocks/userapp_types";
import { jsonString } from "../mocks/json_template_second_screen";

const jsonData: FetchedJsonSecondScreen = JSON.parse(jsonString);
const parameterConfigMap: ParameterConfig[] =
  jsonData.userapp_builder_config.layoutConfig.parameterMap;
type ParametersListProps = {
  itemParameters: Parameter[];
};

const renderParameter = (
  paramConfig: ParameterConfig,
  itemParameter: Parameter,
) => {
  let displayValue;
  let style = {};

  switch (paramConfig.type) {
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
        if (!paramConfig || !paramConfig.showSecondScreen) return null;

        return renderParameter(paramConfig, itemParameter);
      })}
    </Box>
  );
}

export default ParametersList;
