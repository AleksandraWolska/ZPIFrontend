import { Box, styled } from "@mui/system";
import { Theme } from "@mui/material/styles";

const AdminActionBox = styled(Box)(({ theme }: { theme: Theme }) => ({
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

export default AdminActionBox;
