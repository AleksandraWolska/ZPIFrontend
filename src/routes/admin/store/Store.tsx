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
import { useTranslation } from "react-i18next";
import {
  ActionBox,
  ClearNavLink,
} from "../../../shared-components/styledComponents";

function Store() {
  const { t } = useTranslation();

  const params = useParams() as { storeId: string };
  const theme = useTheme();

  const options = [
    {
      label: t("admin.store.reservationsTitle"),
      value: "reservations",
      description: t("admin.store.reservationsDesc"),
      icon: <EventSeatIcon sx={{ fontSize: "5rem", color: "grey" }} />,
    },
    {
      label: t("admin.store.itemListTitle"),
      value: "item-list",
      description: t("admin.store.itemListDesc"),
      icon: (
        <FormatListBulletedSharpIcon sx={{ fontSize: "5rem", color: "grey" }} />
      ),
    },
    {
      label: t("admin.store.addItemTitle"),
      value: "add-item",
      description: t("admin.store.addItemDesc"),
      icon: <AddIcon sx={{ fontSize: "5rem", color: "grey" }} />,
    },
    {
      label: t("admin.store.storeSettingsTitle"),
      value: "settings",
      description: t("admin.store.storeSettingsDesc"),
      icon: <SettingsIcon sx={{ fontSize: "5rem", color: "grey" }} />,
    },
    {
      label: t("admin.store.viewUserAppTitle"),
      value: `/${params.storeId}`,
      description: t("admin.store.viewUserAppDesc"),
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
