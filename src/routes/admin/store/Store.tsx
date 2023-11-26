import { useNavigate, useParams } from "react-router-dom";
import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import AddIcon from "@mui/icons-material/Add";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AdminActionBox from "../components/AdminActionBox";

function Store() {
  const navigate = useNavigate();
  const params = useParams() as { storeId: string };

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
    {
      label: "View user website",
      value: `/userapp/${params.storeId}`,
      description: "View generated user application for the store",
      icon: <VisibilityIcon sx={{ fontSize: "5rem", color: "grey" }} />,
    },
  ];

  return (
    <Container maxWidth="lg">
      <List>
        {options.map((option) => (
          <ListItem key={option.value} onClick={() => navigate(option.value)}>
            <AdminActionBox>
              <Box sx={{ margin: 1, marginRight: 3 }}>{option.icon}</Box>
              <ListItemText
                primary={<Typography variant="h4">{option.label}</Typography>}
                secondary={
                  <Typography variant="body1" color="grey">
                    {option.description}
                  </Typography>
                }
              />
            </AdminActionBox>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Store;
