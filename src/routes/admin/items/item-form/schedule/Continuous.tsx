import { useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { ContinuousSchedule } from "../../../types";
import ScheduleCalendar, {
  BigCalendarEvent,
} from "./schedule-calendar/ScheduleCalendar";
import { useItemForm } from "../ItemFormProvider";

function Continuous() {
  const { item, setItem } = useItemForm();

  const { schedule } = item as {
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
              setItem({
                schedule: parseEventsToContinuousSchedule(events),
              })
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
      start: dayjs(r.startDateTime).toDate(),
      end: dayjs(r.endDateTime).toDate(),
    };
  });
}

function parseEventsToContinuousSchedule(
  events: BigCalendarEvent[],
): ContinuousSchedule {
  return {
    scheduledRanges: events.map((e) => {
      return {
        startDateTime: e.start.toISOString(),
        endDateTime: e.end.toISOString(),
      };
    }),
  };
}

export default Continuous;
