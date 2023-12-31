import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation } from "react-router-dom";
import {
  Typography,
  Grid,
  Box,
  IconButton,
  Collapse,
  Divider,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  ActionBox,
  ClearNavLink,
} from "../../shared-components/styledComponents";
import AllStores from "./AllStores";

function Home() {
  const [openUsage, setOpenUsage] = useState(true);
  const [openAbout, setOpenAbout] = useState(true);
  const [openAuthors, setOpenAuthors] = useState(true);
  const theme = useTheme();
  const auth = useAuth();
  const location = useLocation();

  // TODO leave for now, maybe more links would be needed
  const options = [
    {
      label: "Admin application",
      description: "Manage your stores or create new",
      value: "/admin",
      icon: <PersonIcon sx={{ fontSize: "5rem", color: "grey" }} />,
    },
  ];

  const toggleSection = (section: string) => {
    if (section === "usage") setOpenUsage(!openUsage);
    if (section === "about") setOpenAbout(!openAbout);
    if (section === "authors") setOpenAuthors(!openAuthors);
  };

  return (
    <Grid container spacing={10} padding={5}>
      {/* Left part */}
      <Grid item xs={12} md={6}>
        <Typography sx={{ mb: 1 }} variant="h1">
          ZPI Project
        </Typography>
        <Typography sx={{ mb: 4 }} variant="h4">
          A generic booking management system with an extensive personalization
          capability.
        </Typography>

        <Box sx={{ width: "100%" }}>
          {/* Usage Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="h5">Usage</Typography>
            <IconButton
              onClick={() => toggleSection("usage")}
              aria-label="expand"
            >
              <ExpandMoreIcon
                style={{
                  transform: openUsage ? "rotate(0deg)" : "rotate(180deg)",
                }}
              />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Collapse in={openUsage}>
            <Typography paragraph>
              Access to the administration panel is possible by selecting the
              admin application option, which redirects the user to the /admin
              path. After logging in, the user sees a button to create a new
              store, which launches the store wizard, guiding through thelocal
              process of collecting data necessary to create a presonalized
              application for end user.
            </Typography>
          </Collapse>

          {/* About Project Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="h5">About Project</Typography>
            <IconButton
              onClick={() => toggleSection("about")}
              aria-label="expand"
            >
              <ExpandMoreIcon
                style={{
                  transform: openAbout ? "rotate(0deg)" : "rotate(180deg)",
                }}
              />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Collapse in={openAbout}>
            <Typography paragraph>
              The aim of the project was to design and implement a universal
              reservation system that can be flexibly adapted to various
              business requirements. The main task was to develop a method for
              automating the process of collecting requirements and conducting
              interviews with customers. This process was intended to provide a
              comprehensive reservation management tool that helps companies
              take a step towards digitizing their operations by providing a
              personalized web application for their end users.
            </Typography>
          </Collapse>

          {/* Authors Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="h5">Authors</Typography>
            <IconButton
              onClick={() => toggleSection("authors")}
              aria-label="expand"
            >
              <ExpandMoreIcon
                style={{
                  transform: openAuthors ? "rotate(0deg)" : "rotate(180deg)",
                }}
              />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Collapse in={openAuthors}>
            <>
              {[
                "Aleksandra Wolska",
                "Szymon Łopuszyński",
                "Gracjan Pasik",
                "Jan Eliasz",
              ].map((author, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Typography key={index} paragraph>
                  {author}
                </Typography>
              ))}
            </>
          </Collapse>
        </Box>
      </Grid>

      {/* Right part */}
      <Grid item xs={12} md={6}>
        <Typography variant="h3" mb={2}>
          Quick links
        </Typography>
        {options.map((option) => (
          <ClearNavLink to={option.value} key={option.value}>
            <ListItem sx={{ cursor: "pointer" }}>
              <ActionBox
                theme={theme}
                sx={{
                  marginBottom: 2,
                }}
              >
                <Box sx={{ margin: 1, marginRight: 3 }}>{option.icon}</Box>
                <ListItemText
                  primary={<Typography variant="h5">{option.label}</Typography>}
                  secondary={
                    <Typography variant="body1" color="grey">
                      {option.description}
                    </Typography>
                  }
                />
              </ActionBox>
            </ListItem>
          </ClearNavLink>
        ))}
        {auth.isAuthenticated ? (
          <ListItem key="logout" sx={{ cursor: "pointer" }}>
            <ActionBox
              theme={theme}
              onClick={() => {
                const currentPath = location.pathname + location.search;
                auth.signoutRedirect({
                  post_logout_redirect_uri: `${window.location.origin}${currentPath}`,
                });
              }}
              sx={{
                marginBottom: 2,
              }}
            >
              <Box sx={{ margin: 1, marginRight: 3 }}>
                <KeyIcon sx={{ fontSize: "5rem", color: "grey" }} />
              </Box>
              <ListItemText
                primary={<Typography variant="h5">Logout</Typography>}
                secondary={
                  <Typography variant="body1" color="grey">
                    Logout from the system
                  </Typography>
                }
              />
            </ActionBox>
          </ListItem>
        ) : (
          <ListItem key="login" sx={{ cursor: "pointer" }}>
            <ActionBox
              theme={theme}
              onClick={() => {
                const currentPath = location.pathname + location.search;
                auth.signinRedirect({
                  redirect_uri: `${window.location.origin}${currentPath}`,
                });
              }}
              sx={{
                marginBottom: 2,
              }}
            >
              <Box sx={{ margin: 1, marginRight: 3 }}>
                <KeyIcon sx={{ fontSize: "5rem", color: "grey" }} />
              </Box>
              <ListItemText
                primary={<Typography variant="h5">Login/Register</Typography>}
                secondary={
                  <Typography variant="body1" color="grey">
                    Resister or login to system
                  </Typography>
                }
              />
            </ActionBox>
          </ListItem>
        )}

        <Typography variant="h3" mb={2} mt={2}>
          Apps created using this system
        </Typography>

        <AllStores />
      </Grid>
    </Grid>
  );
}

export default Home;
