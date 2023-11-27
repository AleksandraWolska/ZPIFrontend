import { useState } from "react";
import {
  Typography,
  Box,
  ListItem,
  ListItemText,
  Container,

  IconButton,
  Divider,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import AllStores from "./AllStores";

function NotFoundPage() {
  const navigate = useNavigate();

  const [openUserAppList, setOpenUserAppList] = useState(false);
  const options = [
    {
      label: "Project Homepage",
      description: "Go to main project page",
      value: "/",
      icon: <HomeIcon sx={{ fontSize: "5rem", color: "grey" }} />,
    },
    {
      label: "Admin application",
      description: "Manage your stores or create new",
      value: "/admin",
      icon: <PersonIcon sx={{ fontSize: "5rem", color: "grey" }} />,
    },
  ];

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        {" "}
        <Typography variant="h1">404</Typography>
        <Typography variant="h5" mb={2}>
          Sorry but this URL dont work. What about...
        </Typography>
        {options.map((option) => (
          <ListItem
            key={option.value}
            onClick={() => navigate(option.value)}
            sx={{ cursor: "pointer" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                boxShadow: 3,
                borderRadius: "10px",
                padding: 2,
                bgcolor: "white",
                "&:hover": {
                  bgcolor: "grey.100",
                },
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
            </Box>
          </ListItem>
        ))}
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            onClick={() => setOpenUserAppList(!openUserAppList)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              m: 2,
              mb: 1,
            }}
          >
            <Typography variant="h5">
              Expand to view apps created using this system
            </Typography>
            <IconButton aria-label="expand">
              <ExpandMoreIcon
                style={{
                  transform: openUserAppList
                    ? "rotate(0deg)"
                    : "rotate(180deg)",
                }}
              />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Collapse in={openUserAppList}>
            <AllStores />
          </Collapse>
        </Box>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
