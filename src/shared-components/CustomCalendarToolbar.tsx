import React from "react";
import { NavigateAction, ToolbarProps } from "react-big-calendar";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface CustomToolbarProps extends ToolbarProps {
  onNavigate: (action: NavigateAction) => void;
}

// eslint-disable-next-line react/function-component-definition
const CustomCalendarToolbar: React.FC<CustomToolbarProps> = ({
  onNavigate,
  label,
}) => {
  const { t } = useTranslation();

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
    >
      <Box className="rbc-toolbar-label" alignItems="center">
        <Typography variant="h4">{label}</Typography>
      </Box>
      <Box className="rbc-btn-group" display="flex">
        <Button variant="outlined" onClick={() => navigate("PREV")}>
          {t("user.components.details.prev")}
        </Button>
        <Button variant="outlined" onClick={() => navigate("TODAY")}>
          {t("user.components.details.today")}
        </Button>
        <Button variant="outlined" onClick={() => navigate("NEXT")}>
          {t("user.components.details.next")}
        </Button>
      </Box>
    </Box>
  );
};

export default CustomCalendarToolbar;
