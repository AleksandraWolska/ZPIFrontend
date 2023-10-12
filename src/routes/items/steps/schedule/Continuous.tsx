import { v4 as uuid } from "uuid";
import { useState } from "react";
import dayjs from "dayjs";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useNewItemSchemaConfig } from "../../NewItemSchemaProvider";
import { ContinuousSchedule } from "../../types";
import ScheduleCalendar, {
  BigCalendarEvent,
} from "./schedule-calendar/ScheduleCalendar";

function Continuous() {
  const { newItemSchema, setOption } = useNewItemSchemaConfig();
  const { schedule } = newItemSchema.options as {
    schedule: ContinuousSchedule;
  };

  const [step, setStep] = useState(30);

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Continuous
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>Apartments, cars</Typography>

      <Stack width="80%" gap={2} alignItems="flex-end">
        <TextField
          label="step"
          value={step.toString()}
          onChange={(e) => {
            setStep(parseInt(e.target.value, 10));
          }}
          type="number"
          inputProps={{
            step: 5,
          }}
        />

        <Box width="100%">
          <ScheduleCalendar
            events={parseContinuousScheduleToEvents(schedule)}
            onEventsChange={(events: BigCalendarEvent[]) =>
              setOption("schedule", parseEventsToContinuousSchedule(events))
            }
            step={step > 0 ? step : 30}
          />
        </Box>
      </Stack>
    </>
  );
}

function parseContinuousScheduleToEvents(
  schedule: ContinuousSchedule,
): BigCalendarEvent[] {
  return schedule.scheduledRanges.map((r) => {
    return {
      id: uuid(),
      start: r.startDateTime.toDate(),
      end: r.endDateTime.toDate(),
    };
  });
}

function parseEventsToContinuousSchedule(
  events: BigCalendarEvent[],
): ContinuousSchedule {
  return {
    scheduledRanges: events.map((e) => {
      return {
        startDateTime: dayjs(e.start),
        endDateTime: dayjs(e.end),
      };
    }),
  };
}

export default Continuous;
