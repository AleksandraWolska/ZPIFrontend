import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useAddItem, { removeIdsFromItem } from "./useAddItem";
import { useItemForm } from "../item-form/ItemFormProvider";
import StepWrapper from "../../components/StepWrapper";
import useStoreConfig from "../../store/useStoreConfig";
import { validateItem } from "../utils";

function Summary() {
  const { t } = useTranslation();

  const { item } = useItemForm();
  const storeConfig = useStoreConfig();
  const addItem = useAddItem();
  const navigate = useNavigate();

  const isValid = validateItem(item, storeConfig);

  return (
    <StepWrapper>
      <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
        {t("admin.items.add.summary")}
      </Typography>

      {!isValid && (
        <Alert severity="error" sx={{ width: "95%", margin: 3 }}>
          <AlertTitle>
            {t("admin.items.add.requiredDataMissingTitle")}
          </AlertTitle>
          {t("admin.items.add.requiredDataMissingDesc")}
        </Alert>
      )}

      <Box sx={{ p: 1, pb: 0 }}>
        <div>{JSON.stringify(item)}</div>
        <Button
          sx={{ p: 2, mt: 2 }}
          fullWidth
          disabled={!isValid}
          variant="contained"
          onClick={() => {
            addItem.mutate(removeIdsFromItem(item), {
              onSuccess: () => {
                navigate("../item-list", { relative: "path" });
              },
            });
          }}
        >
          {t("admin.items.add.addItemButton")}
        </Button>
      </Box>
    </StepWrapper>
  );
}

export default Summary;
