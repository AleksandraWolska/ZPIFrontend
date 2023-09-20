import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import { jsonStringMainPage } from "./mocks/responseMainPage";
import { FetchedJsonMainPage } from "./mocks/types";

const jsonData: FetchedJsonMainPage = JSON.parse(jsonStringMainPage);

function UserAppWrapper() {
  const { appId } = useParams();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {jsonData.data.storeConfig.owner.name} {appId}
            </Typography>
            <Button color="inherit">Contact</Button>
            <Button color="inherit">Log in</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}

export default UserAppWrapper;
