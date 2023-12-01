import { Box, useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminAppTopBar from "./AdminAppTopBar";

function AdminAppWrapper() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const minHeight = `calc(100vh - ${matches ? "64px" : "56px"})`;
  return (
    <Box sx={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
      <AdminAppTopBar />
      <Box
        maxWidth="1200px"
        sx={{
          backgroundColor: "#ffffff",
          minHeight,
          margin: "auto",
          paddingTop: theme.spacing(1),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminAppWrapper;
