import {
  Typography,
  Box,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";

import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

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
        <Typography variant="h5" mb={2} mt={2}>
          Apps created using this system
        </Typography>
        <Typography>placeholder for all stores</Typography>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
