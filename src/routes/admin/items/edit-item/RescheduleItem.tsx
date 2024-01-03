import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/system";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useItemToBeEdited from "./useItemToBeEdited";
import ItemFormProvider, { useItemForm } from "../item-form/ItemFormProvider";
import Schedule from "../item-form/schedule/Schedule";
import useEditItem from "./useEditItem";
import { Reservation } from "../../../../types";

function RescheduleItem() {
  const itemToBeEdited = useItemToBeEdited();

  return (
    <ItemFormProvider initialItem={itemToBeEdited}>
      <ScheduleForm />
    </ItemFormProvider>
  );
}

function ScheduleForm() {
  const { t } = useTranslation();

  const { item } = useItemForm();
  const editItem = useEditItem();
  const navigate = useNavigate();

  const [conflictingReservations, setConflictingReservations] = useState<
    Reservation[]
  >([]);

  return (
    <Container>
      <Box
        sx={{
          maxWidth: "1000px",
          width: "90vw",
          boxShadow: "1px 1px 5px 2px rgba(0, 0, 0, .2)",
          borderRadius: "15px",
          padding: 1.25,
          margin: "auto",
        }}
      >
        <Schedule />

        <Box sx={{ p: 3, mt: 4 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              editItem.mutate(item, {
                onSuccess: () => {
                  navigate("../..", { relative: "path" });
                },
                onError: async (error) => {
                  if (error instanceof Response) {
                    const data = (await error.json()) as {
                      reservations: Reservation[];
                    };
                    setConflictingReservations(data.reservations);
                  }
                },
              });
            }}
          >
            {t("admin.items.reschedule.reschedule")}
          </Button>
        </Box>
      </Box>

      {conflictingReservations.length > 0 && (
        <ConflictingReservationsDialog
          reservations={conflictingReservations}
          onClose={() => {
            setConflictingReservations([]);
          }}
        />
      )}
    </Container>
  );
}

function ConflictingReservationsDialog({
  reservations,
  onClose,
}: {
  reservations: Reservation[];
  onClose: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Dialog open>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "medium" }}>
        <Typography variant="h4">
          {t("admin.items.reschedule.conflictingReservationsTitle")}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("admin.items.reschedule.conflictingReservationsDesc")}
        </Typography>

        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

        {reservations.map((r) => {
          return (
            <Box display="flex">
              <Typography fontWeight="lighter">{r.id}</Typography>
              <Typography ml={1}>
                {new Date(r.startDateTime).toLocaleString()}
              </Typography>
              {r.endDateTime && (
                <>
                  <Typography ml={1}>-</Typography>
                  <Typography ml={1}>
                    {new Date(r.endDateTime).toLocaleString()}
                  </Typography>
                </>
              )}
            </Box>
          );
        })}

        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => {
            onClose();
          }}
          sx={{ mt: 2 }}
        >
          {t("common.ok")}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default RescheduleItem;
