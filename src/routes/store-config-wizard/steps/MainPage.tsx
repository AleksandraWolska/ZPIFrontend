import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useStoreConfig } from "../StoreConfigProvider";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import ChangePageButtons from "../../admin/components/ChangePageButtons";
import StepContentWrapper from "./components/StepContentWrapper";
import WizardStepTitle from "./components/WizardStepTitle";
import WizardStepDescription from "./components/WizardStepDescription";
import BackButton from "./components/BackButton";

function MainPage({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { storeConfig, setMainPageAttribute } = useStoreConfig();
  const { mainPage } = storeConfig;

  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC)}
      />

      <WizardStepTitle>Main Page Features</WizardStepTitle>

      <WizardStepDescription>
        Enter welcome texts, and define visibility of features on the main page
      </WizardStepDescription>

      <Box width="100%" padding={2.5}>
        <TextField
          fullWidth
          label="Welcome text - line 1"
          name="welcomeTextLine1"
          value={mainPage.welcomeTextLine1}
          onChange={(e) =>
            setMainPageAttribute("welcomeTextLine1", e.target.value)
          }
        />

        <TextField
          sx={{ marginTop: 1.25 }}
          fullWidth
          label="Welcome text - line 2"
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
          label="Enable filters"
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
          label="Display title for item in items list"
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
          label="Display subtitle for item in items list"
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
          label="Display item images in items list"
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
          label="Display ratings for each items - this option will allow users to rate your items"
        />
      </FormGroup>

      <ChangePageButtons
        onNext={() => setActiveStep(STORE_CONFIG_STEPS.DETAILS_PAGE)}
      />
    </StepContentWrapper>
  );
}

export default MainPage;
