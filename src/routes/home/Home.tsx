import { useState } from "react";
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
// import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ActionBox, ClearNavLink } from "../common/styledComponents";
import AllStores from "./AllStores";

function Home() {
  // const { t } = useTranslation();
  const [openUsage, setOpenUsage] = useState(true);
  const [openAbout, setOpenAbout] = useState(true);
  const [openAuthors, setOpenAuthors] = useState(true);
  const theme = useTheme();

  const options = [
    {
      label: "Admin application",
      description: "Manage your stores or create new",
      value: "/admin",
      icon: <PersonIcon sx={{ fontSize: "5rem", color: "grey" }} />,
    },
    {
      label: "Login/Register",
      description: "Resister or login to system",
      value: "/secret",
      icon: <KeyIcon sx={{ fontSize: "5rem", color: "grey" }} />,
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
        <Typography variant="h2">ZPI Project</Typography>
        <Typography variant="body1">
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
              Description of how to use the project...
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
              The project aims to develop a flexible and customizable
              reservation system tailored to meet the diverse needs of end users
              through extensive personalization and adaptability
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
          <ClearNavLink to={option.value}>
            <ListItem key={option.value} sx={{ cursor: "pointer" }}>
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
        <Typography variant="h3" mb={2} mt={2}>
          Apps created using this system
        </Typography>

        <AllStores />
      </Grid>
    </Grid>
  );
}

export default Home;
