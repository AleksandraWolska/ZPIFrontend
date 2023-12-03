import { Box, styled } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { NavLink as RouterNavLink } from "react-router-dom";

export const ActionBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  boxShadow: theme.shadows[3],
  borderRadius: "10px",
  padding: theme.spacing(2),
  bgcolor: "white",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover || "#f0f0f0",
  },
}));

export const ClearNavLink = styled(RouterNavLink)({
  textDecoration: "none",
  color: "inherit",
});
