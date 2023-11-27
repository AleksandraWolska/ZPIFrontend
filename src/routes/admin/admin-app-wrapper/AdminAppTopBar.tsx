import { useState, MouseEvent } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "react-oidc-context";
import { styled } from "@mui/system";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import useAdminStores from "../admin-main-page/useAdminStores";

function AdminAppTopBar() {
  const params = useParams() as { storeId: string };
  const adminStores = useAdminStores();
  const store = adminStores?.find((s) => s.storeConfigId === params.storeId);

  return (
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
              {store ? (
                <ToolbarNavLink to={`/admin/${store.storeConfigId}`}>
                  <Typography sx={{ typography: { xs: "h5", md: "h4" } }}>
                    {store.name} (admin)
                  </Typography>
                </ToolbarNavLink>
              ) : (
                <ToolbarNavLink to="/admin">
                  {" "}
                  <Typography sx={{ typography: { xs: "h5", md: "h4" } }}>
                    Genervation
                  </Typography>
                </ToolbarNavLink>
              )}
            </Box>
          </Box>

          <TopBarMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function TopBarMenu() {
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
          <MenuItem>
            <MenuText onClick={() => navigate("/admin")}>
            <PersonIcon sx={{ color: "#fff" }} />
            <Typography ml={1} component="span">
              {auth.user?.profile.email}
            </Typography>
          </MenuText></MenuItem>
        )}

        <MenuItem>{auth.isAuthenticated ? (
          <MenuText
            onClick={() => {
              auth.signoutRedirect({
                post_logout_redirect_uri: `${window.location.origin}/admin`,
              });
            }}
          >
            <LogoutIcon sx={{ color: "#fff" }} />
            <Typography ml={1} component="span">
              logout
            </Typography>
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
            <LoginIcon sx={{ color: "#fff" }} />
            <Typography ml={1} component="span">
              login
            </Typography>
          </MenuText>
        )}</MenuItem>
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
            <MenuItem onClick={() => navigate("/admin")}>
              <MobileMenuItemText>
                <PersonIcon />
                <Typography ml={1.5}>admin</Typography>
              </MobileMenuItemText>
            </MenuItem>
          )}

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
                <Typography ml={1}> logout </Typography>
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

const MenuText = styled(Box)({
  textTransform: "uppercase",
  cursor: "pointer",
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

export default AdminAppTopBar;
