import { useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { SlotsSchedule } from "../../../types";
import ScheduleCalendar, {
  BigCalendarEvent,
} from "./schedule-calendar/ScheduleCalendar";
import { useItemForm } from "../ItemFormProvider";
import StepWrapper from "../../../components/StepWrapper";

function Slots() {
  const { item, setItem } = useItemForm();

  const { schedule } = item as {
    schedule: SlotsSchedule;
  };

  const [step, setStep] = useState(30);

  return (
    <StepWrapper>
      <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
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

        <Box
          sx={{
            width: "100%",
            maxHeight: "50vh",
            overflow: "auto",
          }}
        >
          <ScheduleCalendar
            events={parseSlotsScheduleToEvents(schedule)}
            onEventsChange={(events: BigCalendarEvent[]) =>
              setItem({
                schedule: parseEventsToSlotsSchedule(events),
              })
            }
            step={step > 0 ? step : 30}
          />
        </Box>
      </Stack>
    </StepWrapper>
  );
}

function parseSlotsScheduleToEvents(
  schedule: SlotsSchedule,
): BigCalendarEvent[] {
  return schedule.scheduledSlots.map((s) => {
    return {
      id: uuid(),
      start: dayjs(s.startDateTime).toDate(),
      end: dayjs(s.endDateTime).toDate(),
    };
  });
}

function parseEventsToSlotsSchedule(events: BigCalendarEvent[]): SlotsSchedule {
  return {
    scheduledSlots: events.map((e) => {
      return {
        startDateTime: e.start.toISOString(),
        endDateTime: e.end.toISOString(),
      };
    }),
  };
}

export default Slots;
