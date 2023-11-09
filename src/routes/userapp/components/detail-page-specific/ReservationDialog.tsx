import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useAuth } from "react-oidc-context";
import { FixedSchedule, NewReservation } from "../../../../types";
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

  const flexibleSummary = (
    <>
      <Typography sx={{ mb: 1 }}>Start: {reservation.startDateTime}</Typography>
      <Typography sx={{ mb: 1 }}>End: {reservation.endDateTime}</Typography>
    </>
  );

  const fixedSummaryWithSubitems = allSubItemIdsMatch ? (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <List sx={{ width: "100%" }}>
        {reservation.subItemIds?.map((subItemId: string) => {
          const subItemElement = item.subItems?.find(
            (si) => si.id === subItemId,
          );
          return (
            <ListItem
              key={subItemId}
              sx={{ justifyContent: "center", display: "flex" }}
            >
              <ListItemText
                primary={`${subItemElement?.title} - ${subItemElement?.subtitle}`}
                secondary={
                  subItemElement?.schedule?.startDateTime &&
                  subItemElement?.schedule?.endDateTime
                    ? `From ${subItemElement?.schedule?.startDateTime} to ${subItemElement?.schedule?.endDateTime}`
                    : ""
                }
                sx={{ textAlign: "center" }} // Center the text of ListItemText
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  ) : (
    <Typography color="error" sx={{ mb: 1, textAlign: "center" }}>
      Error: One or more items in the reservation do not match available items.
    </Typography>
  );

  const fixedSummary = subItem ? (
    fixedSummaryWithSubitems
  ) : (
    <>
      <Typography>[no subitems]</Typography>
      {item.initialSettings.schedule &&
        "startDateTime" in item.initialSettings.schedule && (
          <Typography>
            Start:{" "}
            {new Date(
              (item.initialSettings.schedule as FixedSchedule).startDateTime,
            ).toLocaleString()}
          </Typography>
        )}
      {item.initialSettings.schedule &&
        "endDateTime" in item.initialSettings.schedule &&
        (item.initialSettings.schedule as FixedSchedule).endDateTime && (
          <Typography>
            End:{" "}
            {new Date(
              (item.initialSettings.schedule as FixedSchedule).endDateTime!,
            ).toLocaleString()}
          </Typography>
        )}
    </>
  );

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
      <DialogContent sx={{ textAlign: "center" }}>
        <Box mb={3}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {storeConfig.detailsPage.reservationSummaryPrompt ||
              "Review your reservation and fill neccessary data"}
          </Typography>
          <Box>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              {item.attributes.title}
            </Typography>
            {storeConfig.core.flexibility ? flexibleSummary : fixedSummary}
            {!storeConfig.core.specificReservation && (
              <Typography sx={{ mb: 1 }}>
                Amount: {reservation.amount}
              </Typography>
            )}
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          </Box>
        </Box>
        <Box mb={3}>
          <Typography variant="h6">Provide neccessary data:</Typography>
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
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="primary"
            variant="outlined"
            sx={{ flex: 1, mr: 0.5 }}
            onClick={() => {
              cancelReservation();
            }}
          >
            CANCEL
          </Button>
          <Button
            color="primary"
            variant="contained"
            sx={{ flex: 1, ml: 0.5 }}
            onClick={() => {
              makeReservation();
            }}
          >
            RESERVE
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
