import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useAuth } from "react-oidc-context";
import { NewReservation } from "../../../../types";
import useItemDetails from "../../details-page/useItemDetails";
import useStoreConfig from "../../wrapper/useStoreConfig";

type Props = {
  reservation: NewReservation;
  setReservation: (reservation: NewReservation) => void;
  cancelReservation: () => void;
  makeReservation: () => void;
};

export function ReservationDialog({
  reservation,
  cancelReservation,
  setReservation,
  makeReservation,
}: Props) {
  const item = useItemDetails();
  const subItem = reservation.subItemIds && reservation.subItemIds.length > 0;

  const allSubItemIdsMatch = reservation.subItemIds?.every(
    (subItemId) => item.subItems?.some((si) => si.id === subItemId),
  );

  const auth = useAuth();

  const storeConfig = useStoreConfig();

  return (
    <Dialog
      open
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "10px" } }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "medium" }}>
        <Typography variant="h4">Summary</Typography>
      </DialogTitle>
      <DialogContent>
        <Box mb={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {storeConfig.detailsPage.reservationSummaryPrompt ||
              "Review your reservation and fill neccessary data"}
          </Typography>
          {!subItem ? (
            <>
              <Typography sx={{ mb: 1 }}>
                Start: {reservation.startDateTime}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                End: {reservation.endDateTime}
              </Typography>
            </>
          ) : allSubItemIdsMatch ? (
            reservation.subItemIds?.map((subItemId: string) => {
              const subItemElement = item.subItems?.find(
                (si) => si.id === subItemId,
              );
              return (
                <Typography key={subItemId} sx={{ mb: 1 }}>
                  {subItemElement?.title} - {subItemElement?.subtitle}
                </Typography>
              );
            })
          ) : (
            <Typography color="error" sx={{ mb: 1 }}>
              Error: One or more items in the reservation do not match available
              items.
            </Typography>
          )}
          <Typography sx={{ mb: 1 }}>Amount: {reservation.amount}</Typography>
        </Box>
        <Box mb={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Informacje:
          </Typography>
          {!auth.isAuthenticated && (
            <TextField
              label="email"
              fullWidth
              margin="normal"
              onChange={(e) => {
                setReservation({
                  ...reservation,
                  userEmail: e.target.value,
                });
              }}
            />
          )}
          {storeConfig.authConfig.requiredPersonalData.map((infoKey) => (
            <TextField
              key={infoKey}
              label={infoKey}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setReservation({
                  ...reservation,
                  personalData: {
                    ...reservation.personalData,
                    [infoKey]: e.target.value,
                  },
                })
              }
            />
          ))}
        </Box>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => {
            makeReservation();
          }}
        >
          RESERVE
        </Button>

        <Button
          color="primary"
          variant="outlined"
          fullWidth
          onClick={() => {
            cancelReservation();
          }}
        >
          CANCEL
        </Button>
      </DialogContent>
    </Dialog>
  );
}
