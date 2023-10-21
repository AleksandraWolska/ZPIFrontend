import { useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { ContinuousSchedule, EnhancedItem } from "../../types";
import ScheduleCalendar, {
  BigCalendarEvent,
} from "./schedule-calendar/ScheduleCalendar";

function Continuous({
  enhancedItem,
  setInitialStatus,
}: {
  enhancedItem: EnhancedItem;
  setInitialStatus: (option: Partial<EnhancedItem["initialStatus"]>) => void;
}) {
  const { schedule } = enhancedItem.initialStatus as {
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
              setInitialStatus({
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
        startDateTime: e.start.toString(),
        endDateTime: e.end.toString(),
      };
    }),
  };
}

export default Continuous;
