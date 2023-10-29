import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { ArrowBack } from "@mui/icons-material";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { useStoreConfig } from "../StoreConfigProvider";
import ChangePageButtons from "../../../shared-components/ChangePageButtons";
import { backIcon, descriptionForm, outerFormBox } from "./commonStyles";

function DetailsPage({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { storeConfig, setDetailsPageAttribute } = useStoreConfig();
  const { detailsPage } = storeConfig;

  return (
    <Box sx={outerFormBox}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Details Page
      </Typography>
      <IconButton
        sx={backIcon}
        onClick={() => setActiveStep(STORE_CONFIG_STEPS.MAIN_PAGE)}
      >
        <ArrowBack />
      </IconButton>
      <Typography sx={descriptionForm}>
        Define visibility of features on item details page, decide if you want
        to have ratings and comments in your store. Also, if you want to
        override reservation prompts for your system, enter them below.
      </Typography>
      <Divider sx={{ marginTop: 3 }} />

      <FormGroup>
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

      <Box sx={{ width: "100%", padding: "20px" }}>
        <TextField
          sx={{ marginBottom: "10px" }}
          fullWidth
          label="Custom reservation summary prompt"
          name="reservationSummaryPrompt"
          value={detailsPage.reservationSummaryPrompt}
          onChange={(e) =>
            setDetailsPageAttribute("reservationSummaryPrompt", e.target.value)
          }
        />

        <TextField
          sx={{ marginBottom: "10px" }}
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
        // onPrev={() => setActiveStep(STORE_CONFIG_STEPS.MAIN_PAGE)}
        onNext={() => setActiveStep(STORE_CONFIG_STEPS.PRINT_STORE_CONFIG)}
      />
    </Box>
  );
}

export default DetailsPage;
