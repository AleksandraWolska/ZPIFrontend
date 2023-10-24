import React from "react";
import { NavigateAction, ToolbarProps } from "react-big-calendar";
import { Box, Button, Typography } from "@mui/material";

interface CustomToolbarProps extends ToolbarProps {
  onNavigate: (action: NavigateAction) => void;
}

// eslint-disable-next-line react/function-component-definition
const CustomCalendarToolbar: React.FC<CustomToolbarProps> = ({
  onNavigate,
  label,
}) => {
  const navigate = (action: NavigateAction) => {
    onNavigate(action);
  };

  return (
    <Box
      padding="10px"
      className="rbc-toolbar"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-end"
      height="100px"
    >
      <Box className="rbc-toolbar-label" alignItems="center">
        <Typography variant="h4">{label}</Typography>
      </Box>
      <Box className="rbc-btn-group" display="flex">
        <Button variant="outlined" onClick={() => navigate("PREV")}>
          Prev
        </Button>
        <Button variant="outlined" onClick={() => navigate("TODAY")}>
          Today
        </Button>
        <Button variant="outlined" onClick={() => navigate("NEXT")}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CustomCalendarToolbar;
