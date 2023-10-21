import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { EnhancedItem, FixedSchedule } from "../../../types";

function Fixed({
  enhancedItem,
  setInitialStatus,
}: {
  enhancedItem: EnhancedItem;
  setInitialStatus: (option: Partial<EnhancedItem["initialStatus"]>) => void;
}) {
  const { schedule } = enhancedItem.initialStatus as {
    schedule: FixedSchedule;
  };

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
              setInitialStatus({
                schedule: {
                  ...schedule,
                  startDateTime: newValue.toISOString(),
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
                setInitialStatus({
                  schedule: {
                    ...schedule,
                    endDateTime: e.target.checked
                      ? dayjs().toISOString()
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
                setInitialStatus({
                  schedule: {
                    ...schedule,
                    endDateTime: newValue.toISOString(),
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
