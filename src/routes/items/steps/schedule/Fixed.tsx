import { DateTimePicker } from "@mui/x-date-pickers";
import { Stack, Typography } from "@mui/material";
import { FixedSchedule, NewItemOptions } from "../../types";

function Fixed({
  newItemSchedule,
  setItemOption,
}: {
  newItemSchedule: FixedSchedule;
  setItemOption: (option: Partial<NewItemOptions>) => void;
}) {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Fixed schedule
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Cinemas, shared transportation
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
        />
      </Stack>
    </>
  );
}

export default Fixed;
