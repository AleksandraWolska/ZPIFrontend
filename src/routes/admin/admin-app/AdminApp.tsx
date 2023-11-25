import { useNavigate } from "react-router-dom";
import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import AddIcon from "@mui/icons-material/Add";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

const options = [
  {
    label: "Reservations",
    value: "reservations",
    description: "View reservations made by users",
    icon: <EventSeatIcon sx={{ fontSize: "5rem", color: "grey" }} />,
  },
  {
    label: "Item list",
    value: "item-list",
    description: "View items available in your store",
    icon: (
      <FormatListBulletedSharpIcon sx={{ fontSize: "5rem", color: "grey" }} />
    ),
  },
  {
    label: "Add new item",
    value: "add-item",
    description: "Add new item for reserving",
    icon: <AddIcon sx={{ fontSize: "5rem", color: "grey" }} />,
  },
];

function AdminApp() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <List>
        {options.map((option) => (
          <ListItem key={option.value} onClick={() => navigate(option.value)}>
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
                cursor: "pointer",
                "&:hover": {
                  bgcolor: theme.palette.action.hover,
                },
              }}
            >
              <Box sx={{ margin: 1, marginRight: 3 }}>{option.icon}</Box>
              <ListItemText
                primary={<Typography variant="h4">{option.label}</Typography>}
                secondary={
                  <Typography variant="body1" color="grey">
                    {option.description}
                  </Typography>
                }
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default AdminApp;
