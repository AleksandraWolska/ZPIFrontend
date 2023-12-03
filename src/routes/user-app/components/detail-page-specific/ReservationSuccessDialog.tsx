import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import useItemDetails from "../../details-page/useItemDetails";
import useStoreConfig from "../../wrapper/useStoreConfig";

type Props = {
  handleReservationFinished: () => void;
};
export function ReservationSuccessDialog({ handleReservationFinished }: Props) {
  const item = useItemDetails();
  const storeConfig = useStoreConfig();

  return (
    <Dialog
      open
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "10px" } }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "medium" }}>
        <Typography variant="h4">Success</Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Box mb={3}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {storeConfig.detailsPage.reservationConfirmationPrompt ||
              "Your reservation had been booked succesfully"}
          </Typography>
          <Box>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              {item.attributes.title}
            </Typography>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          </Box>
        </Box>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => {
            handleReservationFinished();
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
}
