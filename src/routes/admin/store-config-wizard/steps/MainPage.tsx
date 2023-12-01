import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useStoreConfig } from "../StoreConfigProvider";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import ChangePageButtons from "../../components/ChangePageButtons";
import StepContentWrapper from "./components/StepContentWrapper";
import WizardStepTitle from "./components/WizardStepTitle";
import WizardStepDescription from "./components/WizardStepDescription";
import BackButton from "./components/BackButton";

function MainPage({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { t } = useTranslation();

  const { storeConfig, setMainPageAttribute } = useStoreConfig();
  const { mainPage } = storeConfig;

  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC)}
      />

      <WizardStepTitle>{t("admin.wizard.mainPage.title")}</WizardStepTitle>

      <WizardStepDescription>
        {t("admin.wizard.mainPage.desc")}
      </WizardStepDescription>

      <Box width="100%" padding={2.5}>
        <TextField
          fullWidth
          label={t("admin.wizard.mainPage.welcomeTextLine1")}
          name="welcomeTextLine1"
          value={mainPage.welcomeTextLine1}
          onChange={(e) =>
            setMainPageAttribute("welcomeTextLine1", e.target.value)
          }
        />

        <TextField
          sx={{ marginTop: 1.25 }}
          fullWidth
          label={t("admin.wizard.mainPage.welcomeTextLine2")}
          name="welcomeTextLine2"
          value={mainPage.welcomeTextLine2}
          onChange={(e) =>
            setMainPageAttribute("welcomeTextLine2", e.target.value)
          }
        />
      </Box>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={mainPage.enableFiltering}
              onChange={(e) => {
                setMainPageAttribute("enableFiltering", e.target.checked);
              }}
            />
          }
          label={t("admin.wizard.mainPage.filters")}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={mainPage.showItemTitle}
              onChange={(e) => {
                setMainPageAttribute("showItemTitle", e.target.checked);
              }}
            />
          }
          label={t("admin.wizard.mainPage.showTitle")}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={mainPage.showItemSubtitle}
              onChange={(e) => {
                setMainPageAttribute("showItemSubtitle", e.target.checked);
              }}
            />
          }
          label={t("admin.wizard.mainPage.subtitle")}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={mainPage.showItemImg}
              onChange={(e) => {
                setMainPageAttribute("showItemImg", e.target.checked);
              }}
            />
          }
          label={t("admin.wizard.mainPage.image")}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={mainPage.showRating}
              onChange={(e) => {
                setMainPageAttribute("showRating", e.target.checked);
              }}
            />
          }
          label={t("admin.wizard.mainPage.rating")}
        />
      </FormGroup>

      <ChangePageButtons
        onNext={() => setActiveStep(STORE_CONFIG_STEPS.DETAILS_PAGE)}
      />
    </StepContentWrapper>
  );
}

export default MainPage;
