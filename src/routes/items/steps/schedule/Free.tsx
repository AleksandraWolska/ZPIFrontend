import { DateTimePicker } from "@mui/x-date-pickers";
import { Stack, Typography } from "@mui/material";
import { FreeSchedule, NewItemOptions } from "../../types";

function Free({
  newItemSchedule,
  setItemOption,
}: {
  newItemSchedule: FreeSchedule;
  setItemOption: (option: Partial<NewItemOptions>) => void;
}) {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Free schedule
      </Typography>

      <Stack alignItems="flex-start" gap={1}>
        <DateTimePicker
          label="startDateTime"
          value={newItemSchedule.startDateTime}
          onChange={(newValue) => {
            if (newValue) {
              setItemOption({
                schedule: {
                  ...newItemSchedule,
                  startDateTime: newValue,
                },
              });
            }
          }}
          format="DD.MM.YYYY HH:mm"
          ampm={false}
        />

        <DateTimePicker
          label="endDateTime"
          value={newItemSchedule.endDateTime}
          onChange={(newValue) => {
            if (newValue) {
              setItemOption({
                schedule: {
                  ...newItemSchedule,
                  endDateTime: newValue,
                },
              });
            }
          }}
          format="DD.MM.YYYY HH:mm"
          ampm={false}
        />
      </Stack>
    </>
  );
}

export default Free;
