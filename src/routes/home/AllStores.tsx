import { Suspense } from "react";
import { Await, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import { StoreSummary } from "../../types";
import AdminActionBox from "../admin/components/AdminActionBox";
import useAllStores from "./useAllStores";

function AllStores() {
  const allStores = useAllStores();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Suspense fallback={<p>Loading stores list...</p>}>
      <Await resolve={allStores} errorElement={<p>Error loading stores</p>}>
        {(userApps) => (
          <>
            {userApps.length === 0 && (
              <Typography m={2} variant="body1">
                There is no stores yet
              </Typography>
            )}

            <List>
              {userApps.map((userApp: StoreSummary) => {
                return (
                  <ListItem
                    key={userApp.storeConfigId}
                    onClick={() =>
                      navigate(`/userapp/${userApp.storeConfigId}`)
                    }
                  >
                    <AdminActionBox theme={theme}>
                      <Box sx={{ margin: 1, marginRight: 3 }}>
                        <StoreIcon sx={{ fontSize: "5rem", color: "grey" }} />
                      </Box>
                      <ListItemText
                        primary={
                          <Typography variant="h4">{userApp.name}</Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="grey">
                            Manage your items, reservation in already existing
                            store
                          </Typography>
                        }
                      />
                    </AdminActionBox>
                  </ListItem>
                );
              })}
            </List>
          </>
        )}
      </Await>
    </Suspense>
  );
}

export default AllStores;
