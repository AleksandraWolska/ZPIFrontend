import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Grid, Typography } from "@mui/material";
import { MultiDaySchedule } from "../../types";
import { useNewItemSchemaConfig } from "../../NewItemSchemaProvider";

function MultiDay() {
  const { newItemSchema, setOption } = useNewItemSchemaConfig();
  const { schedule } = newItemSchema.options as {
    schedule: MultiDaySchedule;
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Multi day
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Car rental, apartment rental
      </Typography>

      <Grid container spacing={1} width="50%">
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="startDate"
            value={schedule.startDate}
            onChange={(newValue) => {
              if (newValue) {
                setOption("schedule", {
                  ...schedule,
                  startDate: newValue,
                });
              }
            }}
            slotProps={{ textField: { fullWidth: true } }}
            format="DD.MM.YYYY"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <DatePicker
            label="end"
            value={schedule.endDate}
            onChange={(newValue) => {
              if (newValue) {
                setOption("schedule", {
                  ...schedule,
                  endDate: newValue,
                });
              }
            }}
            slotProps={{ textField: { fullWidth: true } }}
            format="DD.MM.YYYY"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TimePicker
            label="reservationStartTime"
            value={schedule.reservationStartTime}
            onChange={(newValue) => {
              if (newValue) {
                setOption("schedule", {
                  ...schedule,
                  reservationStartTime: newValue,
                });
              }
            }}
            slotProps={{ textField: { fullWidth: true } }}
            format="HH:mm"
            ampm={false}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TimePicker
            label="reservationEndTime"
            value={schedule.reservationEndTime}
            onChange={(newValue) => {
              if (newValue) {
                setOption("schedule", {
                  ...schedule,
                  reservationEndTime: newValue,
                });
              }
            }}
            slotProps={{ textField: { fullWidth: true } }}
            format="HH:mm"
            ampm={false}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default MultiDay;
