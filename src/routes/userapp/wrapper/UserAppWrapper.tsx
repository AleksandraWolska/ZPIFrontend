import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  blue,
  lime,
  red,
  green,
  yellow,
  deepPurple,
  teal,
  amber,
  orange,
  pink,
  lightGreen,
} from "@mui/material/colors";
import useOwner from "./useOwner";

function UserAppWrapper() {
  const owner = useOwner();

  const colorMap: { [key: string]: unknown } = {
    lime,
    red,
    deepPurple,
    teal,
    lightGreen,
    amber,
    orange,
    blue,
    pink,
    green,
    yellow,
  };
  const chosenColor = (owner.color && colorMap[owner.color]) || blue;

  const theme = createTheme({
    palette: {
      primary: chosenColor,
    },
  });
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default UserAppWrapper;
