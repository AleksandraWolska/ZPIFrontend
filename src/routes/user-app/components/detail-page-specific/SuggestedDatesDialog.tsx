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

import { useTranslation } from "react-i18next";
import { CheckAvailabilityResponse } from "../../types";

type Props = {
  responseSuggestions: CheckAvailabilityResponse[];
  handleSuggestedDateClick: (suggestionId: string) => void;
  setShowSuggestedDialog: () => void;
};

export function SuggestedDatesDialog({
  responseSuggestions,
  handleSuggestedDateClick,
  setShowSuggestedDialog,
}: Props) {
  const { t } = useTranslation();

  return (
    <Dialog
      open
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "10px" } }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "medium" }}>
        <Typography variant="h4">
          {t("user.components.details.unavailable")}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Box mb={3}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {t("user.components.details.unavailableMessage")}
          </Typography>

          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Box margin="auto">
            <List>
              {responseSuggestions?.map(
                (suggestion: CheckAvailabilityResponse) => (
                  <ListItem
                    button
                    key={suggestion.id}
                    onClick={() => handleSuggestedDateClick(suggestion.id)}
                  >
                    <Typography margin="auto">
                      {`${t("user.components.details.start")}: ${new Date(
                        suggestion.suggestedStart!,
                      ).toLocaleString()}, ${t(
                        "user.components.details.end",
                      )}: ${new Date(
                        suggestion.suggestedEnd!,
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
          {t("common.cancel")}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
