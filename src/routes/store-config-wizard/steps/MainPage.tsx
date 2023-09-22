import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useStoreConfig } from "../StoreConfigProvider";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import ChangePageButtons from "../components/ChangePageButtons";

function MainPage({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { storeConfig, setMainPageAttribute } = useStoreConfig();
  const { mainPage } = storeConfig;

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Main Page
      </Typography>

      <TextField
        label="welcomeTextLine1"
        name="welcomeTextLine1"
        value={mainPage.welcomeTextLine1}
        onChange={(e) =>
          setMainPageAttribute("welcomeTextLine1", e.target.value)
        }
      />

      <TextField
        label="welcomeTextLine2"
        name="welcomeTextLine2"
        value={mainPage.welcomeTextLine2}
        onChange={(e) =>
          setMainPageAttribute("welcomeTextLine2", e.target.value)
        }
      />

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
          label="enableFiltering"
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
          label="showItemTitle"
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
          label="showItemSubtitle"
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
          label="showItemImg"
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
          label="showRating"
        />
      </FormGroup>

      <Box marginTop={2}>
        <ChangePageButtons
          onPrev={() =>
            setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC)
          }
          onNext={() => setActiveStep(STORE_CONFIG_STEPS.DETAILS_PAGE)}
        />
      </Box>
    </>
  );
}

export default MainPage;
