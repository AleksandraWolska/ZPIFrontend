import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
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
      <Box sx={{ backgroundColor: "#eee", minHeight: "100vh" }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky">
            <Toolbar>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "1200px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <Box onClick={() => navigate(`/userapp/${storeId}`)}>
                  {owner.logoSrc ? (
                    <img
                      style={{ cursor: "pointer" }}
                      height="40"
                      src={owner.logoSrc}
                      alt="logo"
                    />
                  ) : (
                    <Typography variant="h6">{owner.name}</Typography>
                  )}
                </Box>
                <Box>
                  <Button color="inherit" onClick={handleMyReservationsClick}>
                    My reservations
                  </Button>
                  <Button color="inherit">About</Button>

                  {auth.isAuthenticated ? (
                    <Button
                      onClick={() => {
                        const currentPath = location.pathname + location.search;
                        auth.signoutSilent({
                          post_logout_redirect_uri: `${window.location.origin}${currentPath}`,
                        });
                      }}
                      color="inherit"
                    >
                      Log out
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        const currentPath = location.pathname + location.search;
                        auth.signinRedirect({
                          redirect_uri: `${window.location.origin}${currentPath}`,
                        });
                      }}
                      color="inherit"
                    >
                      Log in
                    </Button>
                  )}
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          maxWidth="1200px"
          margin="auto"
          sx={{ backgroundColor: "#ffffff" }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserAppWrapper;
