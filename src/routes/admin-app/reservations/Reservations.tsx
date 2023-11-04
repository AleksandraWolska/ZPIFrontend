import { Checkbox, Container, FormControlLabel, Stack } from "@mui/material";
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
