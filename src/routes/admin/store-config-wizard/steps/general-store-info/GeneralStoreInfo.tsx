import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStoreConfig } from "../../StoreConfigProvider";
import ChangePageButtons from "../../../components/ChangePageButtons";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../../types";
import { OWNER_COLORS } from "../../../../../types";
import WizardStepTitle from "../components/WizardStepTitle";
import WizardStepDescription from "../components/WizardStepDescription";
import StepContentWrapper from "../components/StepContentWrapper";
import useDebounce from "./useDebounce";
import useCheckName from "./useCheckName";

function GeneralStoreInfo({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { t } = useTranslation();

  const { storeConfig, setOwnerAttribute } = useStoreConfig();
  const { owner } = storeConfig;

  const location = useLocation();
  const isNew = location.pathname.includes("new");

  const debouncedName = useDebounce(owner.name, 500);
  const isNameAvailable = useCheckName(debouncedName);
  const debouncedLogoSrc = useDebounce(owner.logoSrc, 500);
  const isLogoPNG =
    debouncedLogoSrc.endsWith(".png") || debouncedLogoSrc === "";

  return (
    <StepContentWrapper>
      <WizardStepTitle>{t("admin.wizard.generalInfo.title")}</WizardStepTitle>

      <WizardStepDescription>
        {t("admin.wizard.generalInfo.desc")}
      </WizardStepDescription>

      <Box width="90%" marginTop={1.25} marginBottom={1.25}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t("admin.wizard.generalInfo.storeName")}
              name="name"
              value={owner.name}
              onChange={(e) => setOwnerAttribute("name", e.target.value)}
              fullWidth
              disabled={!isNew}
              error={isNew && !isNameAvailable}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label={t("admin.wizard.generalInfo.logoSrc")}
              name="logoSrc"
              value={owner.logoSrc}
              onChange={(e) => setOwnerAttribute("logoSrc", e.target.value)}
              fullWidth
              error={!isLogoPNG}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label={t("admin.wizard.generalInfo.phone")}
              name="phone"
              value={owner.phone}
              onChange={(e) => setOwnerAttribute("phone", e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label={t("admin.wizard.generalInfo.email")}
              name="email"
              value={owner.email}
              onChange={(e) => setOwnerAttribute("email", e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl size="small" variant="outlined" fullWidth>
              <InputLabel id="Main App Color">Main App Color</InputLabel>
              <Select
                label="Main App Color"
                value={owner.color}
                onChange={(e) => setOwnerAttribute("color", e.target.value)}
                fullWidth
              >
                {Object.values(OWNER_COLORS).map((color) => {
                  return (
                    <MenuItem key={color} value={color}>
                      {color.toLocaleLowerCase()}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <WizardStepDescription>
        [TBD new informational step] - Next few steps will allow you to specify
        mechanics of reservation [OK]
      </WizardStepDescription>

      <ChangePageButtons
        onNext={() =>
          isNew
            ? setActiveStep(STORE_CONFIG_STEPS.FLEXIBILITY)
            : setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC)
        }
      />
    </StepContentWrapper>
  );
}

export default GeneralStoreInfo;
