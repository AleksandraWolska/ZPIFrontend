import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { useStoreConfig } from "../StoreConfigProvider";
import ChangePageButtons from "../../components/ChangePageButtons";
import StepContentWrapper from "./components/StepContentWrapper";
import WizardStepTitle from "./components/WizardStepTitle";
import WizardStepDescription from "./components/WizardStepDescription";
import BackButton from "./components/BackButton";
import { calculateProgress } from "./utils";

function DetailsPage({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { t } = useTranslation();

  const { storeConfig, setDetailsPageAttribute } = useStoreConfig();
  const { detailsPage } = storeConfig;

  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.MAIN_PAGE;
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.DETAILS_PAGE, prevStep),
          );
        }}
      />

      <WizardStepTitle>{t("admin.wizard.detailsPage.title")}</WizardStepTitle>

      <WizardStepDescription>
        {t("admin.wizard.detailsPage.desc")}
      </WizardStepDescription>

      <FormGroup sx={{ marginTop: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={detailsPage.showSubItemTitle}
              onChange={(e) => {
                setDetailsPageAttribute("showSubItemTitle", e.target.checked);
              }}
            />
          }
          label={t("admin.wizard.detailsPage.showTitle")}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={detailsPage.showSubItemSubtitle}
              onChange={(e) => {
                setDetailsPageAttribute(
                  "showSubItemSubtitle",
                  e.target.checked,
                );
              }}
            />
          }
          label={t("admin.wizard.detailsPage.subtitle")}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={detailsPage.showItemDescription}
              onChange={(e) => {
                setDetailsPageAttribute(
                  "showItemDescription",
                  e.target.checked,
                );
              }}
            />
          }
          label={t("admin.wizard.detailsPage.showDesc")}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={detailsPage.showRating}
              onChange={(e) => {
                setDetailsPageAttribute("showRating", e.target.checked);
              }}
            />
          }
          label={t("admin.wizard.detailsPage.rating")}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={detailsPage.showComments}
              onChange={(e) => {
                setDetailsPageAttribute("showComments", e.target.checked);
              }}
            />
          }
          label={t("admin.wizard.detailsPage.comments")}
        />
      </FormGroup>

      <Box sx={{ width: "100%", padding: 2.5 }}>
        <TextField
          inputProps={{ maxLength: 255 }}
          sx={{ marginBottom: 1.25 }}
          fullWidth
          label={t("admin.wizard.detailsPage.summaryPrompt")}
          name="reservationSummaryPrompt"
          value={detailsPage.reservationSummaryPrompt}
          onChange={(e) =>
            setDetailsPageAttribute("reservationSummaryPrompt", e.target.value)
          }
        />

        <TextField
          inputProps={{ maxLength: 255 }}
          sx={{ marginBottom: 1.25 }}
          fullWidth
          label={t("admin.wizard.detailsPage.confirmationPrompt")}
          name="reservationConfirmationPrompt"
          value={detailsPage.reservationConfirmationPrompt}
          onChange={(e) =>
            setDetailsPageAttribute(
              "reservationConfirmationPrompt",
              e.target.value,
            )
          }
        />

        <TextField
          inputProps={{ maxLength: 255 }}
          fullWidth
          label={t("admin.wizard.detailsPage.failurePrompt")}
          name="reservationFailurePrompt"
          value={detailsPage.reservationFailurePrompt}
          onChange={(e) =>
            setDetailsPageAttribute("reservationFailurePrompt", e.target.value)
          }
        />
      </Box>

      <ChangePageButtons
        onNext={() => {
          const nextStep = STORE_CONFIG_STEPS.AUTH_CONFIG;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.DETAILS_PAGE, nextStep),
          );
        }}
      />
    </StepContentWrapper>
  );
}

export default DetailsPage;
