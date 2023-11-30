import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FixedSchedule } from "../../../types";
import { useItemForm } from "../ItemFormProvider";
import StepWrapper from "../../../components/StepWrapper";

function Fixed() {
  const { item, setItem } = useItemForm();

  const { schedule } = item as {
    schedule: FixedSchedule;
  };

  return (
    <StepWrapper>
      <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
        Fixed schedule
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Define time range for your item
      </Typography>

      <Stack alignItems="flex-start" gap={1}>
        <DateTimePicker
          label="startDateTime"
          value={dayjs(schedule.startDateTime)}
          onChange={(newValue) => {
            if (newValue) {
              setItem({
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
                setItem({
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
                setItem({
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
    </StepWrapper>
  );
}

export default Fixed;
