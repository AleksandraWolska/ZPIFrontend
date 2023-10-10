import { DateTimePicker } from "@mui/x-date-pickers";
import { Stack, Typography } from "@mui/material";
import { FreeSchedule } from "../../types";
import { useNewItemSchemaConfig } from "../../NewItemSchemaProvider";

function Free() {
  const { newItemSchema, setOption } = useNewItemSchemaConfig();
  const { schedule } = newItemSchema.options as {
    schedule: FreeSchedule;
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Free schedule
      </Typography>

      <Stack alignItems="flex-start" gap={1}>
        <DateTimePicker
          label="startDateTime"
          value={schedule.startDateTime}
          onChange={(newValue) => {
            if (newValue) {
              setOption("schedule", {
                ...schedule,
                startDateTime: newValue,
              });
            }
          }}
          format="DD.MM.YYYY HH:mm"
          ampm={false}
        />

        <DateTimePicker
          label="endDateTime"
          value={schedule.endDateTime}
          onChange={(newValue) => {
            if (newValue) {
              setOption("schedule", {
                ...schedule,
                endDateTime: newValue,
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
