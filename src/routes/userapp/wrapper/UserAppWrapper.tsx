import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import useOwner from "./useOwner";

function UserAppWrapper() {
  const owner = useOwner();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {owner.name}
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
