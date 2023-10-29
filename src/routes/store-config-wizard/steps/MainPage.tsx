import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useStoreConfig } from "../StoreConfigProvider";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import ChangePageButtons from "../../../shared-components/ChangePageButtons";
import {
  backIcon,
  descriptionForm,
  outerFormBox,
  titleForm,
} from "./commonStyles";

function MainPage({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { storeConfig, setMainPageAttribute } = useStoreConfig();
  const { mainPage } = storeConfig;

  return (
    <Box sx={outerFormBox}>
      <IconButton
        sx={backIcon}
        onClick={() => setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC)}
      >
        <ArrowBack />
      </IconButton>
      <Typography variant="h4" sx={titleForm}>
        Main Page Features
      </Typography>
      <Typography sx={descriptionForm}>
        Enter welcome texts, and define visibility of features on the main page
      </Typography>

      <Box width="100%" padding="20px">
        <TextField
          fullWidth
          sx={{ marginBottom: "10px" }}
          label="Welcome text - line 1"
          name="welcomeTextLine1"
          value={mainPage.welcomeTextLine1}
          onChange={(e) =>
            setMainPageAttribute("welcomeTextLine1", e.target.value)
          }
        />

        <TextField
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
    </Box>
  );
}

export default MainPage;
