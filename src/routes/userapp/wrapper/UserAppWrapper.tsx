import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
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

  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const minHeight = `calc(100vh - ${matches ? "64px" : "56px"})`;

  const handleMyReservationsClick = () => {
    if (storeId) {
      navigate(`/userapp/${storeId}/reservations`);
    } else {
      console.error("Missing storeId");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
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
              <Box
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/userapp/${storeId}`)}
              >
                {owner.logoSrc ? (
                  <img height="40" src={owner.logoSrc} alt="logo" />
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

        <Box
          maxWidth="1200px"
          sx={{
            backgroundColor: "#ffffff",
            minHeight,
            margin: "auto",
            paddingTop: theme.spacing(1),
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserAppWrapper;
