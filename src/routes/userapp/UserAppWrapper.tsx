import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";

function UserAppWrapper() {
  const { appId } = useParams();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              COMPANY {appId}
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
