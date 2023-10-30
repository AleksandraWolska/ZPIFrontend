import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { useStoreConfig } from "../StoreConfigProvider";
import ChangePageButtons from "../../../shared-components/ChangePageButtons";
import StepContentWrapper from "./components/StepContentWrapper";
import WizardStepTitle from "./components/WizardStepTitle";
import WizardStepDescription from "./components/WizardStepDescription";
import BackButton from "./components/BackButton";

function DetailsPage({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { storeConfig, setDetailsPageAttribute } = useStoreConfig();
  const { detailsPage } = storeConfig;

  return (
    <StepContentWrapper>
      <BackButton onClick={() => setActiveStep(STORE_CONFIG_STEPS.MAIN_PAGE)} />

      <WizardStepTitle>Details Page</WizardStepTitle>

      <WizardStepDescription>
        Define visibility of features on item details page, decide if you want
        to have ratings and comments in your store. Also, if you want to
        override reservation prompts for your system, enter them below.
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
          label="Display item's title"
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
          label="Display item's subtitle"
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
          label="Display description for items"
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
          label="Display ratings - this option will allow users to rate your items"
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
          label="Display comments/reviews - this option will allow users to add comments your items"
        />
      </FormGroup>

      <Box sx={{ width: "100%", padding: 2.5 }}>
        <TextField
          sx={{ marginBottom: 1.25 }}
          fullWidth
          label="Custom reservation summary prompt"
          name="reservationSummaryPrompt"
          value={detailsPage.reservationSummaryPrompt}
          onChange={(e) =>
            setDetailsPageAttribute("reservationSummaryPrompt", e.target.value)
          }
        />

        <TextField
          sx={{ marginBottom: 1.25 }}
          fullWidth
          label="Custom reservation confirmation prompt"
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
          fullWidth
          label="Custom reservation failure prompt"
          name="reservationFailurePrompt"
          value={detailsPage.reservationFailurePrompt}
          onChange={(e) =>
            setDetailsPageAttribute("reservationFailurePrompt", e.target.value)
          }
        />
      </Box>

      <ChangePageButtons
        onNext={() => setActiveStep(STORE_CONFIG_STEPS.AUTH_CONFIG)}
      />
    </StepContentWrapper>
  );
}

export default DetailsPage;
