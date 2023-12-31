import { Box, Grid, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { askForItemAmount } from "../utils";
import { useItemForm } from "./ItemFormProvider";
import useStoreConfig from "../../store/useStoreConfig";
import StepWrapper from "../../components/StepWrapper";
import useDebounce from "../../store-config-wizard/steps/general-store-info/useDebounce";

function GeneralInfo() {
  const { t } = useTranslation();

  const storeConfig = useStoreConfig();
  const { item, setItemAttribute, setItem } = useItemForm();
  const debouncedImageSrc = useDebounce(item.attributes.image, 500);
  const isImageCorrectFormat =
    debouncedImageSrc.endsWith(".png") ||
    debouncedImageSrc.endsWith(".jpg") ||
    debouncedImageSrc === "";
  return (
    <StepWrapper>
      <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
        {t("admin.items.form.generalInfo")}
      </Typography>

      <Box width="90%" marginTop={1.25} marginBottom={1.25}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              inputProps={{ maxLength: 255 }}
              label={t("admin.items.form.title")}
              name="title"
              value={item.attributes.title}
              onChange={(e) => setItemAttribute({ title: e.target.value })}
              fullWidth
              required
              error={!item.attributes.title}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              inputProps={{ maxLength: 255 }}
              label={t("admin.items.form.subtitle")}
              name="subtitle"
              value={item.attributes.subtitle}
              onChange={(e) => setItemAttribute({ subtitle: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              inputProps={{ maxLength: 1000 }}
              label={t("admin.items.form.desc")}
              name="description"
              value={item.attributes.description}
              onChange={(e) =>
                setItemAttribute({ description: e.target.value })
              }
              fullWidth
              multiline
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              inputProps={{ maxLength: 255 }}
              label={t("admin.items.form.image")}
              name="image"
              value={item.attributes.image}
              onChange={(e) => setItemAttribute({ image: e.target.value })}
              error={!isImageCorrectFormat}
              fullWidth
            />
          </Grid>

          {askForItemAmount(storeConfig.core) && (
            <Grid item xs={12} sm={6}>
              <TextField
                inputProps={{ maxLength: 255, min: 1 }}
                label={t("admin.items.form.amount")}
                name="amount"
                value={item.amount?.toString()}
                onChange={(e) =>
                  setItem({ amount: parseInt(e.target.value, 10) })
                }
                fullWidth
                type="number"
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </StepWrapper>
  );
}

export default GeneralInfo;
