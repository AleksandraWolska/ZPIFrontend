import { useState, MouseEvent } from "react";
import { NavLink } from "react-router-dom";
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
import useStoreConfig from "./useStoreConfig";

function TopBar() {
  const storeConfig = useStoreConfig();

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
            {storeConfig.owner.name}
          </Typography>

          <TopBarMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const menuItems = [
  {
    name: "5173",
    to: "/",
  },
  {
    name: "Home",
    to: "/admin",
  },
];

function TopBarMenu() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const auth = useAuth();

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {menuItems.map((menuItem) => (
          <NavLink
            key={menuItem.name}
            to={menuItem.to}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <MenuText>{menuItem.name}</MenuText>
          </NavLink>
        ))}
        <MenuText
          onClick={() => {
            auth.signoutSilent();
          }}
          sx={{
            cursor: "pointer",
          }}
        >
          Logout
        </MenuText>
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
          {menuItems.map((menuItem) => (
            <MenuItem key={menuItem.name}>
              <NavLink
                to={menuItem.to}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <MobileMenuItemText>{menuItem.name}</MobileMenuItemText>
              </NavLink>
            </MenuItem>
          ))}
          <MenuItem>
            <MobileMenuItemText
              onClick={() => {
                auth.signoutSilent();
              }}
              sx={{
                cursor: "pointer",
              }}
            >
              Logout
            </MobileMenuItemText>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

const MenuText = styled(Typography)({
  marginLeft: "1rem",
  textTransform: "uppercase",
});

const MobileMenuItemText = styled(Typography)({
  width: "100%",
  textAlign: "center",
  textTransform: "uppercase",
});

export default TopBar;
