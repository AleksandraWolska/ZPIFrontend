import { useState, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  useMediaQuery,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Outlet,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { styled } from "@mui/system";
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
import { useTranslation } from "react-i18next";
import useStoreConfig from "./useStoreConfig";
import SwitchLangMobile from "../../../shared-components/SwitchLangMobile";
import SwitchLang from "../../../shared-components/SwitchLang";

function UserAppWrapper() {
  const storeConfig = useStoreConfig();
  const { owner } = storeConfig;
  const { storeId } = useParams();

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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
        <AppBar position="sticky">
          <Container maxWidth="lg">
            <Toolbar
              disableGutters
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box sx={{ typography: { xs: "h5", md: "h4" } }}>
                  <ToolbarNavLink to={`/${storeId}`}>
                    {owner.logoSrc && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          margin: "auto",
                          marginRight: 1.5,
                          alignItems: "center",
                        }}
                      >
                        <img height="40" src={owner.logoSrc} alt="logo" />
                      </Box>
                    )}
                    <Typography sx={{ typography: { xs: "h5", md: "h4" } }}>
                      {owner.name}
                    </Typography>
                  </ToolbarNavLink>
                </Box>
              </Box>

              <TopBarMenu />
            </Toolbar>
          </Container>
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

function TopBarMenu() {
  const { t } = useTranslation();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {auth.isAuthenticated && (
          <MenuInfo>
            <PersonIcon />
            <Typography ml={1}> {auth.user?.profile.email} </Typography>
          </MenuInfo>
        )}
        <MenuItem>
          <MenuText onClick={() => navigate(`reservations`)}>
            <EventIcon />
            <Typography ml={1}>
              {" "}
              {t("user.wrapper.yourReservations")}
            </Typography>
          </MenuText>
        </MenuItem>

        <MenuItem>
          <MenuText>
            <SwitchLang />
          </MenuText>
        </MenuItem>

        <MenuItem>
          {auth.isAuthenticated ? (
            <MenuText
              onClick={() => {
                const currentPath = location.pathname + location.search;
                auth.signoutRedirect({
                  post_logout_redirect_uri: `${window.location.origin}${currentPath}`,
                });
              }}
            >
              <LogoutIcon />
              <Typography ml={1}>{t("auth.logout")}</Typography>
            </MenuText>
          ) : (
            <MenuText
              onClick={() => {
                const currentPath = location.pathname + location.search;
                auth.signinRedirect({
                  redirect_uri: `${window.location.origin}${currentPath}`,
                });
              }}
            >
              <LoginIcon />
              <Typography ml={1}> login </Typography>
            </MenuText>
          )}
        </MenuItem>
      </Box>

      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          aria-label="menu options"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon sx={{ scale: "1.2" }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
            marginTop: "10px",
          }}
        >
          {auth.isAuthenticated && (
            <MenuItem>
              <MobileMenuItemText>
                <PersonIcon />
                <Typography ml={1}>{auth.user?.profile.email}</Typography>
              </MobileMenuItemText>
            </MenuItem>
          )}
          <MenuItem onClick={() => navigate(`reservations`)}>
            <MobileMenuItemText>
              <EventIcon />
              <Typography ml={1}>
                {" "}
                {t("user.wrapper.yourReservations")}
              </Typography>
            </MobileMenuItemText>
          </MenuItem>
          <MenuItem>
            {auth.isAuthenticated ? (
              <MobileMenuItemText
                onClick={() => {
                  auth.signoutRedirect({
                    post_logout_redirect_uri: `${window.location.origin}/admin`,
                  });
                }}
              >
                <LogoutIcon />
                <Typography ml={1}>{t("auth.logout")}</Typography>
              </MobileMenuItemText>
            ) : (
              <MobileMenuItemText
                onClick={() => {
                  const currentPath = location.pathname + location.search;
                  auth.signinRedirect({
                    redirect_uri: `${window.location.origin}${currentPath}`,
                  });
                }}
              >
                <LoginIcon />
                <Typography ml={1}> login </Typography>
              </MobileMenuItemText>
            )}
          </MenuItem>

          <MenuItem>
            <SwitchLangMobile handleCloseNavMenu={handleCloseNavMenu} />
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

const ToolbarNavLink = styled(NavLink)({
  textDecoration: "none",
  color: "#fff",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const MenuText = styled(Typography)({
  textTransform: "uppercase",
  cursor: "pointer",
  display: "flex",
  padding: "1rem",
  height: "100%",
  alignItems: "center",
  flexDirection: "row",
});

const MenuInfo = styled(Box)({
  marginLeft: "1rem",
  textTransform: "uppercase",

  display: "flex",
  padding: "1rem",
  height: "100%",
  alignItems: "center",
  flexDirection: "row",
});

const MobileMenuItemText = styled(Typography)({
  width: "100%",
  textAlign: "center",
  textTransform: "uppercase",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
});

export default UserAppWrapper;
