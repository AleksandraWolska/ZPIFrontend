import { Suspense } from "react";
import { Await } from "react-router-dom";
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
import {
  ActionBox,
  ClearNavLink,
} from "../../shared-components/styledComponents";
import useAllStores from "./useAllStores";

function AllStores() {
  const allStores = useAllStores();
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
                  <ClearNavLink
                    key={userApp.storeConfigId}
                    to={`/${userApp.storeConfigId}`}
                  >
                    <ListItem>
                      <ActionBox theme={theme}>
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
                      </ActionBox>
                    </ListItem>
                  </ClearNavLink>
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
