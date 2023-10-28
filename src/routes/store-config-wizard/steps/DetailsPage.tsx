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
        Enter welcome texts, and define visibility of features on the main page
      </Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={detailsPage.showRating}
              onChange={(e) => {
                setDetailsPageAttribute("showRating", e.target.checked);
              }}
            />
          }
          label="showRating"
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
          label="showComments"
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
          label="showItemDescription"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={detailsPage.showSubItemTitle}
              onChange={(e) => {
                setDetailsPageAttribute("showSubItemTitle", e.target.checked);
              }}
            />
          }
          label="showSubItemTitle"
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
          label="showSubItemSubtitle"
        />
      </FormGroup>

      <Box sx={{ width: "100%", padding: "20px" }}>
        <TextField
          sx={{ marginBottom: "10px" }}
          fullWidth
          label="Reservation confirmation prompt"
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
          sx={{ marginBottom: "10px" }}
          fullWidth
          label="reservationFailurePrompt"
          name="reservationFailurePrompt"
          value={detailsPage.reservationFailurePrompt}
          onChange={(e) =>
            setDetailsPageAttribute("reservationFailurePrompt", e.target.value)
          }
        />

        <TextField
          fullWidth
          label="reservationSummaryPrompt"
          name="reservationSummaryPrompt"
          value={detailsPage.reservationSummaryPrompt}
          onChange={(e) =>
            setDetailsPageAttribute("reservationSummaryPrompt", e.target.value)
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
