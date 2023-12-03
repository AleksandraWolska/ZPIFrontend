import { useParams } from "react-router-dom";
import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import AddIcon from "@mui/icons-material/Add";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ActionBox,
  ClearNavLink,
} from "../../../shared-components/customComponents";

function Store() {
  const params = useParams() as { storeId: string };
  const theme = useTheme();

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
      label: "Store settings",
      value: "settings",
      description: "Edit features of your store",
      icon: <SettingsIcon sx={{ fontSize: "5rem", color: "grey" }} />,
    },
    {
      label: "View user website",
      value: `/${params.storeId}`,
      description: "View generated user application for the store",
      icon: <VisibilityIcon sx={{ fontSize: "5rem", color: "grey" }} />,
    },
  ];

  return (
    <Container maxWidth="lg">
      <List>
        {options.map((option) => (
          <ClearNavLink key={option.value} to={option.value}>
            <ListItem>
              <ActionBox theme={theme}>
                <Box sx={{ margin: 1, marginRight: 3 }}>{option.icon}</Box>
                <ListItemText
                  primary={<Typography variant="h4">{option.label}</Typography>}
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
      </List>
    </Container>
  );
}

export default Store;
