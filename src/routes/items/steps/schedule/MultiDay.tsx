import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Grid, Typography } from "@mui/material";
import { MultiDaySchedule, NewItemOptions } from "../../types";

function MultiDay({
  newItemSchedule,
  setItemOption,
}: {
  newItemSchedule: MultiDaySchedule;
  setItemOption: (option: Partial<NewItemOptions>) => void;
}) {
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
            value={newItemSchedule.startDate}
            onChange={(newValue) => {
              if (newValue) {
                setItemOption({
                  schedule: {
                    ...newItemSchedule,
                    startDate: newValue,
                  },
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
            value={newItemSchedule.endDate}
            onChange={(newValue) => {
              if (newValue) {
                setItemOption({
                  schedule: {
                    ...newItemSchedule,
                    endDate: newValue,
                  },
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
            value={newItemSchedule.reservationStartTime}
            onChange={(newValue) => {
              if (newValue) {
                setItemOption({
                  schedule: {
                    ...newItemSchedule,
                    reservationStartTime: newValue,
                  },
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
            value={newItemSchedule.reservationEndTime}
            onChange={(newValue) => {
              if (newValue) {
                setItemOption({
                  schedule: {
                    ...newItemSchedule,
                    reservationEndTime: newValue,
                  },
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
