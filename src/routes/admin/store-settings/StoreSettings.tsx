import { Container } from "@mui/system";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Stepper from "../store-config-wizard/Stepper";
import StoreConfigProvider, {
  useStoreConfig as useStoreConfigWizard,
} from "../store-config-wizard/StoreConfigProvider";
import useEditStoreConfig from "./useEditStoreConfig";
import useOldStoreConfig from "../store/useStoreConfig";
import useDeleteStore from "./useDeleteStore";

function StoreSettings() {
  const oldStoreConfig = useOldStoreConfig();

  return (
    <StoreConfigProvider initialStoreConfig={oldStoreConfig}>
      <EditForm />
    </StoreConfigProvider>
  );
}

function EditForm() {
  const { t } = useTranslation();

  const { storeId } = useParams() as { storeId: string };

  const editStoreConfig = useEditStoreConfig();
  const deleteStore = useDeleteStore();

  const navigate = useNavigate();

  const { storeConfig: newStoreConfig } = useStoreConfigWizard();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stepper />

      <Button
        variant="outlined"
        sx={{ mt: 4, width: "100%" }}
        onClick={() => {
          editStoreConfig.mutate(newStoreConfig, {
            onSuccess: () => {
              navigate("/admin");
            },
          });
        }}
      >
        {t("admin.store.editStore")}
      </Button>

      <Button
        color="error"
        sx={{ mt: 4, width: "100%" }}
        onClick={() => {
          deleteStore.mutate(
            { storeId },
            {
              onSuccess: () => {
                navigate("/admin");
              },
            },
          );
        }}
      >
        {t("admin.store.deleteStore")}
      </Button>
    </Container>
  );
}

export default StoreSettings;
