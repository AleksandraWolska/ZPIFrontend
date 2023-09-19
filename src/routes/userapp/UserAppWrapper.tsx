import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import { jsonString } from "./mocks/json_template_second_screen";
import { FetchedJsonSecondScreen } from "./mocks/userapp_types";

const jsonData: FetchedJsonSecondScreen = JSON.parse(jsonString);

function UserAppWrapper() {
  const { appId } = useParams();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {jsonData.userapp_builder_config.layoutConfig.companyName} {appId}
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
