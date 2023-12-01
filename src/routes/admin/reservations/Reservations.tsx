import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useReservations from "./useReservations";
import ReservationCard from "./ReservationCard";
import ConfirmDialog from "../components/ConfirmDialog";
import useConfirmReservation from "./useConfirmReservation";

function Reservations() {
  const reservations = useReservations();

  const [futureOnly, setFutureOnly] = useState(false);

  const [reservationToBeConfirmed, setReservationToBeConfirmed] = useState<
    string | null
  >(null);
  const confirmReservation = useConfirmReservation();

  if (!reservations.length)
    return (
      <Box display="flex" m={3} alignItems="center" flexDirection="column">
        <Typography variant="overline">
          It looks like there is no bookings in this store yet
        </Typography>
      </Box>
    );
  return (
    <>
      <Container maxWidth="lg">
        <FormControlLabel
          sx={{ marginTop: 4 }}
          control={
            <Checkbox
              checked={futureOnly}
              onChange={(e) => {
                setFutureOnly(e.target.checked);
              }}
            />
          }
          label="Show future reservations only"
        />

        <Stack spacing={1} marginTop={2}>
          {reservations
            .filter((res) => {
              if (futureOnly) {
                return new Date(res.startDateTime) >= new Date();
              }
              return true;
            })
            .map((reservation) => {
              return (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  setReservationToBeConfirmed={setReservationToBeConfirmed}
                />
              );
            })}
        </Stack>
      </Container>

      <ConfirmDialog
        isOpen={!!reservationToBeConfirmed}
        onCancel={() => {
          setReservationToBeConfirmed(null);
        }}
        onConfirm={() => {
          confirmReservation.mutate(reservationToBeConfirmed!);
          setReservationToBeConfirmed(null);
        }}
        title="Confirm reservation"
        message="Are you sure you want to confirm this reservation? This action cannot be undone."
      />
    </>
  );
}

export default Reservations;
