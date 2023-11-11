import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "react-oidc-context";
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
import useStoreConfig from "./useStoreConfig";

function UserAppWrapper() {
  const storeConfig = useStoreConfig();
  const { owner } = storeConfig;
  const { storeId } = useParams();
  const navigate = useNavigate();

  const auth = useAuth();
  const location = useLocation();

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

  const handleMyReservationsClick = () => {
    if (storeId) {
      navigate(`/userapp/${storeId}/reservations/1`);
    } else {
      console.error("Missing storeId");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                onClick={() => navigate(`/userapp/${storeId}`)}
                component="div"
                sx={{ flexGrow: 1 }}
              >
                {owner.name}
              </Typography>
              <Button color="inherit" onClick={handleMyReservationsClick}>
                My reservations
              </Button>
              <Button color="inherit">About</Button>
              {auth.isAuthenticated ? (
                <Button
                  onClick={() => {
                    auth.signoutSilent();
                  }}
                  color="inherit"
                >
                  Log out
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    const currentPath = location.pathname + location.search;
                    // to corectly redirect, in keycloack, valid redirectURL should be set to http://localhost:5173/*
                    auth.signinRedirect({
                      redirect_uri: `${window.location.origin}${currentPath}`,
                    });
                  }}
                  color="inherit"
                >
                  Log in
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
        <Outlet />
      </>
    </ThemeProvider>
  );
}

export default UserAppWrapper;
