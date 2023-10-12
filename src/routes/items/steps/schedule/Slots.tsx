import { v4 as uuid } from "uuid";
import { useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import ScheduleCalendar, {
  BigCalendarEvent,
} from "./schedule-calendar/ScheduleCalendar";
import { SlotsSchedule } from "../../types";
import { useNewItemSchemaConfig } from "../../NewItemSchemaProvider";

function Slots() {
  const { newItemSchema, setOption } = useNewItemSchemaConfig();
  const { schedule } = newItemSchema.options as {
    schedule: SlotsSchedule;
  };

  const [step, setStep] = useState(30);

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Short slots
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Office hours, appointments
      </Typography>

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
            events={parseSlotsScheduleToEvents(schedule)}
            onEventsChange={(events: BigCalendarEvent[]) =>
              setOption("schedule", parseEventsToSlotsSchedule(events))
            }
            step={step > 0 ? step : 30}
          />
        </Box>
      </Stack>
    </>
  );
}

function parseSlotsScheduleToEvents(
  schedule: SlotsSchedule,
): BigCalendarEvent[] {
  return schedule.scheduledSlots.map((s) => {
    return {
      id: uuid(),
      start: s.startDateTime.toDate(),
      end: s.endDateTime.toDate(),
    };
  });
}

function parseEventsToSlotsSchedule(events: BigCalendarEvent[]): SlotsSchedule {
  return {
    scheduledSlots: events.map((e) => {
      return {
        startDateTime: dayjs(e.start),
        endDateTime: dayjs(e.end),
      };
    }),
  };
}

export default Slots;
