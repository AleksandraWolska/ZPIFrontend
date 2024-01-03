import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { useTranslation } from "react-i18next";
import useAdminStores from "./useAdminStores";
import { StoreSummary } from "../../../types";
import {
  ActionBox,
  ClearNavLink,
} from "../../../shared-components/styledComponents";

function AdminMainPage() {
  const { t } = useTranslation();

  const adminStores = useAdminStores() as StoreSummary[];
  const theme = useTheme();
  return (
    <Container>
      {adminStores.length > 0 && (
        <Typography m={2} variant="h4">
          {t("admin.headings.yourStores")}
        </Typography>
      )}

      <List>
        {adminStores.map((adminStore) => {
          return (
            <ClearNavLink
              to={adminStore.storeConfigId}
              key={adminStore.storeConfigId}
            >
              <ListItem>
                <ActionBox theme={theme}>
                  <Box sx={{ margin: 1, marginRight: 3 }}>
                    <StoreIcon sx={{ fontSize: "5rem", color: "grey" }} />
                  </Box>
                  <ListItemText
                    primary={
                      <Typography variant="h4">{adminStore.name}</Typography>
                    }
                    secondary={
                      <Typography variant="body1" color="grey">
                        {t("admin.desc.existingStore")}
                      </Typography>
                    }
                  />
                </ActionBox>
              </ListItem>
            </ClearNavLink>
          );
        })}
      </List>
      <Typography m={2} mt={4} mb={3} variant="h4">
        {adminStores.length
          ? t("admin.headings.createNew")
          : t("admin.headings.noStores")}
      </Typography>

      <ClearNavLink to="new">
        <ListItem key="new">
          <ActionBox theme={theme}>
            <Box sx={{ margin: 1, marginRight: 3 }}>
              <AddBusinessIcon sx={{ fontSize: "5rem", color: "grey" }} />
            </Box>
            <ListItemText
              primary={
                <Typography variant="h4">
                  {t("admin.headings.newStore")}
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="grey">
                  {t("admin.desc.newStore")}
                </Typography>
              }
            />
          </ActionBox>
        </ListItem>
      </ClearNavLink>
    </Container>
  );
}

export default AdminMainPage;
