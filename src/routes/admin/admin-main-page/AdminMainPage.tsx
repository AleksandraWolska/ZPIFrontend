import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import useAdminStores from "./useAdminStores";
import { StoreSummary } from "../../../types";

function AdminMainPage() {
  const adminStores = useAdminStores() as StoreSummary[];
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Container>
      {adminStores.length > 0 && (
        <Typography m={2} variant="h4">
          Your stores
        </Typography>
      )}

      <List>
        {adminStores.map((adminStore) => {
          return (
            <ListItem
              key={adminStore.storeConfigId}
              onClick={() => navigate(adminStore.storeConfigId)}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  boxShadow: 3,
                  borderRadius: "10px",
                  padding: 2,
                  bgcolor: "white",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: theme.palette.action.hover,
                  },
                }}
              >
                <Box sx={{ margin: 1, marginRight: 3 }}>
                  <StoreIcon sx={{ fontSize: "5rem", color: "grey" }} />
                </Box>
                <ListItemText
                  primary={
                    <Typography variant="h4">{adminStore.name}</Typography>
                  }
                  secondary={
                    <Typography variant="body1" color="grey">
                      Manage your items, reservation in already existing store
                    </Typography>
                  }
                />
              </Box>
            </ListItem>
          );
        })}
      </List>
      <Typography m={2} mt={4} mb={3} variant="h4">
        {adminStores.length
          ? "Or create new store?"
          : "You have no stores yet, start with creating one"}
      </Typography>

      <ListItem key="new" onClick={() => navigate("new")}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            boxShadow: 3,
            borderRadius: "10px",
            padding: 2,
            bgcolor: "white",
            cursor: "pointer",
            "&:hover": {
              bgcolor: theme.palette.action.hover,
            },
          }}
        >
          <Box sx={{ margin: 1, marginRight: 3 }}>
            <AddBusinessIcon sx={{ fontSize: "5rem", color: "grey" }} />
          </Box>
          <ListItemText
            primary={<Typography variant="h4">New store</Typography>}
            secondary={
              <Typography variant="body1" color="grey">
                Create new store for your business
              </Typography>
            }
          />
        </Box>
      </ListItem>
    </Container>
  );
}

export default AdminMainPage;
