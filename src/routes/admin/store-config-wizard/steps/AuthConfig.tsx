import {
  Autocomplete,
  Collapse,
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

function AuthConfig({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { t } = useTranslation();

  const { storeConfig, setAuthConfigAttribute } = useStoreConfig();
  const { authConfig } = storeConfig;

  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => setActiveStep(STORE_CONFIG_STEPS.DETAILS_PAGE)}
      />

      <WizardStepTitle>{t("admin.wizard.authConfig.title")}</WizardStepTitle>

      <WizardStepDescription>
        {t("admin.wizard.authConfig.desc")}
      </WizardStepDescription>

      <Stack gap={3} margin={2.5}>
        <FormControl>
          <FormLabel id="isPrivate">
            Should your store be public or private (grant access only to a
            specific group of users)?
          </FormLabel>

          <RadioGroup
            sx={{ margin: "auto" }}
            row
            aria-labelledby="isPrivate"
            value={authConfig.isPrivate ? "private" : "public"}
            onChange={(e) => {
              setAuthConfigAttribute({
                isPrivate: e.target.value === "private",
              });
            }}
          >
            <FormControlLabel
              value="public"
              control={<Radio />}
              label="Public"
            />
            <FormControlLabel
              value="private"
              control={<Radio />}
              label="Private"
            />
          </RadioGroup>
        </FormControl>

        <Collapse in={authConfig.isPrivate}>
          <FormControl fullWidth>
            <FormLabel id="whoCanAccess">Who can access your store?</FormLabel>

            <Autocomplete
              aria-labelledby="whoCanAccess"
              multiple
              freeSolo
              fullWidth
              onChange={(_e, values) => {
                setAuthConfigAttribute({ whiteList: values as string[] });
              }}
              options={[]}
              value={authConfig.whiteList || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Add a value typing it and pressing enter"
                  size="medium"
                />
              )}
            />
          </FormControl>
        </Collapse>

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
        onNext={() => setActiveStep(STORE_CONFIG_STEPS.SUMMARY)}
      />
    </StepContentWrapper>
  );
}

export default AuthConfig;
