import { DateTimePicker } from "@mui/x-date-pickers";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useNewItemSchemaConfig } from "../../NewItemSchemaProvider";
import { FixedSchedule } from "../../../types";

function Fixed() {
  const { newItemSchema, setOption } = useNewItemSchemaConfig();
  const { schedule } = newItemSchema.options as { schedule: FixedSchedule };

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
          value={dayjs(schedule.startDateTime)}
          onChange={(newValue) => {
            if (newValue) {
              setOption({
                schedule: {
                  ...schedule,
                  startDateTime: newValue.toString(),
                },
              });
            }
          }}
          format="DD.MM.YYYY HH:mm"
          ampm={false}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={!!schedule.endDateTime}
              onChange={(e) => {
                setOption({
                  schedule: {
                    ...schedule,
                    endDateTime: e.target.checked
                      ? dayjs().toString()
                      : undefined,
                  },
                });
              }}
            />
          }
          label="endDateTime"
        />

        {!!schedule.endDateTime && (
          <DateTimePicker
            label="endDateTime"
            value={dayjs(schedule.endDateTime)}
            onChange={(newValue) => {
              if (newValue) {
                setOption({
                  schedule: {
                    ...schedule,
                    endDateTime: newValue.toString(),
                  },
                });
              }
            }}
            format="DD.MM.YYYY HH:mm"
            ampm={false}
          />
        )}
      </Stack>
    </>
  );
}

export default Fixed;
