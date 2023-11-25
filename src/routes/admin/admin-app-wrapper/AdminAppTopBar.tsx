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
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "react-oidc-context";
import { styled } from "@mui/system";
import { NavLink, useLocation, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import useAdminStores from "../admin-main-page/useAdminStores";

function AdminAppTopBar() {
  const params = useParams() as { storeId: string };
  const adminStores = useAdminStores();
  const store = adminStores?.find((s) => s.storeConfigId === params.storeId);

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ typography: { xs: "h5", md: "h4" } }}>
            {store ? (
              <ToolbarNavLink to={`/admin/${store.storeConfigId}`}>
                {store.name}
              </ToolbarNavLink>
            ) : (
              <ToolbarNavLink to="/admin">Genervation</ToolbarNavLink>
            )}
          </Typography>

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

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
        {auth.isAuthenticated && (
          <NavLink to="/admin">
            <IconButton>
              <HomeIcon sx={{ color: "#fff" }} />
            </IconButton>
          </NavLink>
        )}

        {auth.isAuthenticated ? (
          <MenuText
            onClick={() => {
              auth.signoutSilent();
            }}
          >
            Logout
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
            Login
          </MenuText>
        )}
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
          }}
        >
          {auth.isAuthenticated && (
            <MenuItem
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <NavLink to="/admin">
                <IconButton>
                  <HomeIcon sx={{ color: "#000" }} />
                </IconButton>
              </NavLink>
            </MenuItem>
          )}

          <MenuItem>
            {auth.isAuthenticated ? (
              <MobileMenuItemText
                onClick={() => {
                  auth.signoutSilent();
                }}
              >
                Logout
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
                Login
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
});

const MenuText = styled(Typography)({
  marginLeft: "1rem",
  textTransform: "uppercase",
  cursor: "pointer",
});

const MobileMenuItemText = styled(Typography)({
  width: "100%",
  textAlign: "center",
  textTransform: "uppercase",
  cursor: "pointer",
});

export default AdminAppTopBar;
