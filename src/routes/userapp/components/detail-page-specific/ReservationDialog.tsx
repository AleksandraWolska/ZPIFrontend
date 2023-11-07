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
  makeReservation: () => void;
};

export function ReservationDialog({
  reservation,
  setReservation,
  makeReservation,
}: Props) {
  const item = useItemDetails();
  const subItem = item.subItems?.find((si) => {
    return si.id === reservation.subItemId;
  });

  const auth = useAuth();

  const storeConfig = useStoreConfig();

  return (
    <Dialog
      open
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "10px" } }}
    >
      <DialogTitle>Reservation</DialogTitle>
      <DialogContent>
        <Box mb={3}>
          <Typography variant="h6">Podsumowanie:</Typography>
          {!subItem ? (
            <>
              <Typography>Start: {reservation.startDateTime}</Typography>
              <Typography>End: {reservation.endDateTime}</Typography>
            </>
          ) : (
            <Typography>
              {subItem.title} - {subItem.subtitle}
            </Typography>
          )}
          <Typography>Amount: {reservation.amount}</Typography>
        </Box>
        <Box mb={3}>
          <Typography variant="h6">Informacje:</Typography>
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
      </DialogContent>
    </Dialog>
  );
}
