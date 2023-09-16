import React from "react";
import { Box, Typography } from "@mui/material";
import {
  Parameter,
  ParameterConfig,
  UserAppBuilderConfig,
  Item,
} from "../mocks/userapp_types";

// TODO
// pass only values compnent needs from userapp builder config
// maybe make it also for 1st screen?
interface ParametersListProps {
  builderConfig: UserAppBuilderConfig;
  selectedItem: Item | null;
}

function ParametersList({ builderConfig, selectedItem }: ParametersListProps) {
  const shouldShowParameters = builderConfig.layoutConfig.parameterMap.some(
    (param: ParameterConfig) => param.showSecondScreen,
  );

  if (!shouldShowParameters || !selectedItem || !selectedItem.parameters) {
    return null;
  }

  return (
    <Box width="fit-content">
      {builderConfig.layoutConfig.parameterMap.map(
        (paramConfig: ParameterConfig) => {
          const parameter = selectedItem.parameters?.find(
            (p: Parameter) => p.name === paramConfig.name,
          );

          if (!parameter) return null;

          let displayValue;
          let style = {};

          switch (paramConfig.type) {
            case "string":
              displayValue = parameter.value;
              style = {
                backgroundColor: "yellow",
                padding: "5px",
                borderRadius: "4px",
                display: "flex",
              };
              break;
            case "boolean":
              displayValue = parameter.value ? "+" : "-";
              style = {
                backgroundColor: "lightGreen",
                color: "black",
                padding: "5px",
                borderRadius: "4px",
                display: "flex",
              };
              break;
            case "number":
              displayValue = `${parameter.value} ${paramConfig.units || ""}`;
              style = {
                backgroundColor: "lightBlue",
                color: "black",
                padding: "5px",
                borderRadius: "4px",
                display: "flex",
              };
              break;
            default:
              displayValue = parameter.value;
          }

          return (
            <Box key={paramConfig.name} style={style}>
              <Typography paddingRight="3px">{paramConfig.name}:</Typography>
              <Typography>{displayValue}</Typography>
            </Box>
          );
        },
      )}
    </Box>
  );
}

export default ParametersList;
