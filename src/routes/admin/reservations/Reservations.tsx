import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useReservations from "./useReservations";
import ReservationCard from "./ReservationCard";
import ConfirmDialog from "../components/ConfirmDialog";
import useConfirmReservation from "./useConfirmReservation";
import useCancelReservation from "./useCancelReservation";

function Reservations() {
  const { t } = useTranslation();

  const reservations = useReservations();

  const [futureOnly, setFutureOnly] = useState(false);

  const [reservationToBeConfirmed, setReservationToBeConfirmed] = useState<
    string | null
  >(null);
  const confirmReservation = useConfirmReservation();

  const [reservationToBeCanceled, setReservationToBeCanceled] = useState<
    string | null
  >(null);
  const cancelReservation = useCancelReservation();

  if (!reservations.length)
    return (
      <Box display="flex" m={3} alignItems="center" flexDirection="column">
        <Typography variant="overline">
          {t("admin.reservations.noReservations")}
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
          label={t("admin.reservations.futureOnly")}
        />

        <Stack spacing={1} marginTop={2}>
          {reservations
            .sort((a, b) => {
              return (
                new Date(a.startDateTime).getTime() -
                new Date(b.startDateTime).getTime()
              );
            })
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
                  setReservationToBeCanceled={setReservationToBeCanceled}
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
        title={t("admin.reservations.confirmReservationTitle")}
        message={t("admin.reservations.confirmReservationMessage")}
      />

      <ConfirmDialog
        isOpen={!!reservationToBeCanceled}
        onCancel={() => {
          setReservationToBeCanceled(null);
        }}
        onConfirm={() => {
          cancelReservation.mutate(reservationToBeCanceled!);
          setReservationToBeCanceled(null);
        }}
        title={t("admin.reservations.cancelReservationTitle")}
        message={t("admin.reservations.cancelReservationMessage")}
      />
    </>
  );
}

export default Reservations;
