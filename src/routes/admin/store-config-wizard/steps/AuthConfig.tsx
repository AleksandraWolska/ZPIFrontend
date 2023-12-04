import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { useStoreConfig } from "../StoreConfigProvider";
import StepContentWrapper from "./components/StepContentWrapper";
import WizardStepTitle from "./components/WizardStepTitle";
import WizardStepDescription from "./components/WizardStepDescription";
import BackButton from "./components/BackButton";
import ChangePageButtons from "../../components/ChangePageButtons";
import { calculateProgress } from "./utils";

function AuthConfig({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { t } = useTranslation();

  const { storeConfig, setAuthConfigAttribute } = useStoreConfig();
  const { authConfig } = storeConfig;

  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.DETAILS_PAGE;
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.AUTH_CONFIG, prevStep),
          );
        }}
      />

      <WizardStepTitle>{t("admin.wizard.authConfig.title")}</WizardStepTitle>

      <WizardStepDescription>
        {t("admin.wizard.authConfig.desc")}
      </WizardStepDescription>

      <Stack gap={3} margin={2.5}>
        <FormControl>
          <FormLabel id="whatDataRequired">
            {t("admin.wizard.authConfig.requiredDataLabel")}
          </FormLabel>

          <Autocomplete
            aria-labelledby="whatDataRequired"
            multiple
            freeSolo
            fullWidth
            onChange={(_e, values) => {
              setAuthConfigAttribute({
                requiredPersonalData: values as string[],
              });
            }}
            options={[]}
            value={authConfig.requiredPersonalData || []}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={t(
                  "admin.wizard.authConfig.requiredDataPlaceholder",
                )}
                size="medium"
              />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel id="confirmationRequired">
            {t("admin.wizard.authConfig.confirmation")}
          </FormLabel>

          <RadioGroup
            sx={{ margin: "auto" }}
            row
            aria-labelledby="confirmationRequired"
            value={authConfig.confirmationRequired ? "yes" : "no"}
            onChange={(e) => {
              setAuthConfigAttribute({
                confirmationRequired: e.target.value === "yes",
              });
            }}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Stack>

      <ChangePageButtons
        onNext={() => {
          const nextStep = STORE_CONFIG_STEPS.SUMMARY;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.AUTH_CONFIG, nextStep),
          );
        }}
      />
    </StepContentWrapper>
  );
}

export default AuthConfig;
