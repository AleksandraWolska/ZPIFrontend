import { useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ScheduleCalendar, {
  BigCalendarEvent,
} from "./schedule-calendar/ScheduleCalendar";
import { useItemForm } from "../ItemFormProvider";
import StepWrapper from "../../../components/StepWrapper";
import { FlexibleSchedule } from "../../../../../types";
import {
  parseEventsToFlexibleSchedule,
  parseFlexibleScheduleToEvents,
} from "./schedule-calendar/utils";

function Slots() {
  const { t } = useTranslation();

  const { item, setItem } = useItemForm();

  const { schedule } = item as {
    schedule: FlexibleSchedule;
  };

  const [step, setStep] = useState(30);

  return (
    <StepWrapper>
      <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
        {t("admin.items.form.slotsTitle")}
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        {t("admin.items.form.slotsDesc")}
      </Typography>

      <Stack width="80%" gap={2} alignItems="flex-end">
        <TextField
          label="step"
          value={step.toString()}
          onChange={(e) => {
            setStep(parseInt(e.target.value, 10));
          }}
          onBlur={() => {
            if (step < 5) setStep(5);
          }}
          type="number"
          inputProps={{
            step: 5,
            min: 5,
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

export default Slots;
