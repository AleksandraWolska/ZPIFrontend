import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
} from "@mui/material";

import { CheckAvailabilityResponseSuggestion } from "../../types";

type Props = {
  responseSuggestions: CheckAvailabilityResponseSuggestion[];
  handleSuggestedDateClick: (suggestionId: string) => void;
  setShowSuggestedDialog: () => void;
};
export function SuggestedDatesDialog({
  responseSuggestions,
  handleSuggestedDateClick,
  setShowSuggestedDialog,
}: Props) {
  return (
    <Dialog
      open
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "10px" } }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "medium" }}>
        <Typography variant="h4">Unavailable, sorry</Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Box mb={3}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Maybe one of below would interest you?
          </Typography>

          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Box margin="auto">
            <List>
              {responseSuggestions?.map(
                (suggestion: CheckAvailabilityResponseSuggestion) => (
                  <ListItem
                    button
                    key={suggestion.id}
                    onClick={() => handleSuggestedDateClick(suggestion.id)}
                  >
                    <Typography margin="auto">
                      {`Start: ${new Date(
                        suggestion.suggestedStart,
                      ).toLocaleString()}, End: ${new Date(
                        suggestion.suggestedEnd,
                      ).toLocaleString()}`}
                    </Typography>
                  </ListItem>
                ),
              )}
            </List>
          </Box>

          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        </Box>

        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={setShowSuggestedDialog}
        >
          CANCEL
        </Button>
      </DialogContent>
    </Dialog>
  );
}
