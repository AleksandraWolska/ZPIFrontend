import { Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import ScheduleCalendar, { Event } from "./ScheduleCalendar";
import { SpecificSchedule } from "../../types";

function SpecificScheduleCalendar({
  specificSchedule,
  setSchedule,
}: {
  specificSchedule: SpecificSchedule;
  setSchedule: (schedule: SpecificSchedule) => void;
}) {
  const [granularityEnabled, setGranularityEnabled] = useState(false);

  return (
    <>
      <Stack direction="row">
        <FormControlLabel
          control={
            <Checkbox
              checked={granularityEnabled}
              onChange={(e) => {
                const enabled = e.target.checked;

                if (!enabled) {
                  setSchedule({
                    ...specificSchedule,
                    options: {
                      ...specificSchedule.options,
                      granularity: 0,
                    },
                  });
                }

                setGranularityEnabled(enabled);
              }}
            />
          }
          label="granularity enabled"
        />

        {granularityEnabled && (
          <TextField
            type="number"
            label="granularity"
            value={specificSchedule.options.granularity}
            onChange={(e) => {
              setSchedule({
                ...specificSchedule,
                options: {
                  ...specificSchedule.options,
                  granularity: Number(e.target.value),
                },
              });
            }}
          />
        )}
      </Stack>

      <ScheduleCalendar
        defaultEvents={parseScheduleToEvents(specificSchedule.available)}
        onEventsChange={(events) =>
          setSchedule({
            ...specificSchedule,
            available: parseEventsToSchedule(events),
          })
        }
        mode="specific"
      />
    </>
  );
}

function parseEventsToSchedule(events: Event[]): {
  startDateTime: string;
  endDateTime: string;
}[] {
  return events.map((e) => {
    return {
      startDateTime: e.start.toString(),
      endDateTime: e.end.toString(),
    };
  });
}

function parseScheduleToEvents(
  schedule: SpecificSchedule["available"],
): Event[] {
  return schedule.map((e) => {
    return {
      id: uuid(),
      start: new Date(e.startDateTime),
      end: new Date(e.endDateTime),
    };
  });
}

export default SpecificScheduleCalendar;
