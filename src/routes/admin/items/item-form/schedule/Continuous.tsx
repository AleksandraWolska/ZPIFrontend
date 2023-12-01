import { useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { FlexibleSchedule } from "../../../types";
import ScheduleCalendar, {
  BigCalendarEvent,
} from "./schedule-calendar/ScheduleCalendar";
import { useItemForm } from "../ItemFormProvider";
import StepWrapper from "../../../components/StepWrapper";
import {
  parseFlexibleScheduleToEvents,
  parseEventsToFlexibleSchedule,
} from "./schedule-calendar/utils";

function Continuous() {
  const { item, setItem } = useItemForm();

  const { schedule } = item as {
    schedule: FlexibleSchedule;
  };

  const [step, setStep] = useState(30);

  return (
    <StepWrapper>
      <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
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

        <Box
          sx={{
            width: "100%",
            maxHeight: "50vh",
            overflow: "auto",
          }}
        >
          <ScheduleCalendar
            events={parseFlexibleScheduleToEvents(schedule)}
            onEventsChange={(events: BigCalendarEvent[]) =>
              setItem({
                schedule: parseEventsToFlexibleSchedule(events),
              })
            }
            step={step > 0 ? step : 30}
          />
        </Box>
      </Stack>
    </StepWrapper>
  );
}

export default Continuous;
