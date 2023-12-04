import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { FixedSchedule } from "../../../types";
import { useItemForm } from "../ItemFormProvider";
import StepWrapper from "../../../components/StepWrapper";

function Fixed() {
  const { t } = useTranslation();

  const { item, setItem } = useItemForm();

  const { schedule } = item as {
    schedule: FixedSchedule;
  };

  return (
    <StepWrapper>
      <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
        {t("admin.items.form.fixedTitle")}
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        {t("admin.items.form.fixedDesc")}
      </Typography>

      <Stack alignItems="flex-start" gap={1}>
        <DateTimePicker
          label={t("admin.items.form.startTime")}
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
          label={t("admin.items.form.addEndTime")}
        />

        {!!schedule.endDateTime && (
          <DateTimePicker
            label={t("admin.items.form.endTime")}
            value={dayjs(schedule.endDateTime)}
            minDateTime={dayjs(schedule.startDateTime)}
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
