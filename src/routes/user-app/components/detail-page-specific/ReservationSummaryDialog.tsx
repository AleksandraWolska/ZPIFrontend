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
  Collapse,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { useTranslation } from "react-i18next";
import { FixedSchedule, NewReservation } from "../../../../types";
import useItemDetails from "../../details-page/useItemDetails";
import useStoreConfig from "../../wrapper/useStoreConfig";
import { shouldShowEnd } from "../../../../shared-components/utils";

type Props = {
  reservation: NewReservation;
  setReservation: (reservation: NewReservation) => void;
  cancelReservation: () => void;
  makeReservation: () => void;
};

export function ReservationSummaryDialog({
  reservation,
  cancelReservation,
  setReservation,
  makeReservation,
}: Props) {
  const { t } = useTranslation();

  const item = useItemDetails();
  const subItem = reservation.subItemIds && reservation.subItemIds.length > 0;

  const allSubItemIdsMatch = reservation.subItemIds?.every(
    (subItemId) => item.subItems?.some((si) => si.id === subItemId),
  );

  const auth = useAuth();

  const storeConfig = useStoreConfig();
  const [showOptionalMessageInput, setShowOptionalMessageInput] =
    useState(false);

  const flexibleSummary = (
    <>
      <Typography sx={{ mb: 1 }}>
        {t("user.components.details.start")}:{" "}
        {new Date(reservation.startDateTime).toLocaleString()}
      </Typography>
      <Typography sx={{ mb: 1 }}>
        {t("user.components.details.end")}:{" "}
        {new Date(reservation.endDateTime!).toLocaleString()}
      </Typography>
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
                  subItemElement?.schedule?.startDateTime
                    ? `${new Date(
                        subItemElement?.schedule?.startDateTime,
                      ).toLocaleString()} ${
                        subItemElement?.schedule?.endDateTime
                          ? `${t("user.components.details.to")} ${new Date(
                              subItemElement?.schedule?.endDateTime,
                            ).toLocaleString()}`
                          : ""
                      }`
                    : ""
                }
                sx={{ textAlign: "center" }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  ) : (
    <Typography color="error" sx={{ mb: 1, textAlign: "center" }}>
      {t("user.components.details.reservationError")}
    </Typography>
  );

  const fixedSummary = subItem
    ? fixedSummaryWithSubitems
    : item.schedule &&
      "startDateTime" in item.schedule && (
        <>
          <Typography>
            {t("user.components.details.start")}:{" "}
            {new Date(
              (item.schedule as FixedSchedule).startDateTime,
            ).toLocaleString()}
          </Typography>{" "}
          {shouldShowEnd(
            (item.schedule as FixedSchedule).startDateTime,
            (item.schedule as FixedSchedule).endDateTime,
          ) && (
            <Typography>
              {t("user.components.details.end")}:{" "}
              {new Date(
                (item.schedule as FixedSchedule).endDateTime!,
              ).toLocaleString()}
            </Typography>
          )}
        </>
      );

  const optionalMessage = (
    <Collapse in={showOptionalMessageInput}>
      <TextField
        label={t("user.components.details.message")}
        fullWidth
        margin="normal"
        onChange={(e) => {
          setReservation({
            ...reservation,
            message: e.target.value,
          });
        }}
      />
    </Collapse>
  );

  return (
    <Dialog
      open
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "10px" } }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "medium" }}>
        <Typography variant="h4">
          {t("user.components.details.summary")}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Box mb={2}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {storeConfig.detailsPage.reservationSummaryPrompt ||
              t("user.components.details.summaryPrompt")}
          </Typography>
          <Box>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              {item.attributes.title}
            </Typography>
            {storeConfig.core.flexibility ? flexibleSummary : fixedSummary}
            {!storeConfig.core.specificReservation && (
              <Typography sx={{ mb: 1 }}>
                {t("user.components.details.amount")}: {reservation.amount}
              </Typography>
            )}
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          </Box>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">
            {t("user.components.details.provideNecessaryData")}
          </Typography>
          {auth.isAuthenticated ? (
            <TextField
              label="email"
              name="email"
              disabled
              fullWidth
              margin="normal"
              value={auth.user?.profile.email}
            />
          ) : (
            <TextField
              label="email"
              name="email"
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
              name={infoKey}
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
          <Box sx={{ mt: 2 }} onClick={() => setShowOptionalMessageInput(true)}>
            <Typography variant="overline" sx={{ cursor: "pointer" }}>
              {showOptionalMessageInput
                ? t("user.components.details.yourMessage")
                : t("user.components.details.addMessage")}
            </Typography>
          </Box>
          {optionalMessage}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="primary"
            variant="outlined"
            sx={{ flex: 1, m: 1 }}
            onClick={() => {
              cancelReservation();
            }}
          >
            {t("common.cancel")}
          </Button>
          <Button
            color="primary"
            variant="contained"
            sx={{ flex: 1, m: 1 }}
            onClick={() => {
              makeReservation();
            }}
          >
            {t("common.reserve")}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
