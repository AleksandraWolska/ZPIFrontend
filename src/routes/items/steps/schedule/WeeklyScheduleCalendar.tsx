import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import { Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { WeeklySchedule } from "../../types";
import ScheduleCalendar, { Event } from "./ScheduleCalendar";
import { DailyAvailability } from "../../../../types";
import Granularity from "./Granularity";

export const defaultWeeklySchedule: WeeklySchedule = {
  available: {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  },
  granularity: 0,
  startDay: dayjs().toString(),
  endDay: dayjs().add(7, "day").toString(),
};

function WeeklyScheduleCalendar({
  weeklySchedule,
  setSchedule,
}: {
  weeklySchedule: WeeklySchedule;
  setSchedule: (schedule: WeeklySchedule) => void;
}) {
  return (
    <>
      <Granularity
        granularity={weeklySchedule.granularity}
        setGranularity={(granularity: number) =>
          setSchedule({
            ...weeklySchedule,
            granularity,
          })
        }
      />

      <Stack direction="row">
        <DatePicker
          label="startDay"
          value={dayjs(weeklySchedule.startDay)}
          onChange={(newValue) =>
            setSchedule({
              ...weeklySchedule,
              startDay: newValue?.toString() ?? dayjs().toString(),
            })
          }
        />

        <DatePicker
          label="endDay"
          value={dayjs(weeklySchedule.endDay)}
          onChange={(newValue) =>
            setSchedule({
              ...weeklySchedule,
              endDay: newValue?.toString() ?? dayjs().toString(),
            })
          }
        />
      </Stack>

      <ScheduleCalendar
        defaultEvents={parseAvailableToEvents(weeklySchedule.available)}
        onEventsChange={(events) =>
          setSchedule({
            ...weeklySchedule,
            available: parseEventsToAvailable(events),
          })
        }
        mode="weekly"
      />
    </>
  );
}

function parseEventsToAvailable(events: Event[]) {
  const initialAvailable = { ...defaultWeeklySchedule.available };

  return events.reduce((acc, event) => {
    const day = event.start.getDay();

    const newDaySchedule: DailyAvailability[] = [
      ...acc[day as keyof typeof acc],
      {
        startTime: `${event.start.getHours()}:${event.start.getMinutes()}`,
        endTime: `${event.end.getHours()}:${event.end.getMinutes()}`,
      },
    ];

    return { ...acc, [day]: newDaySchedule };
  }, initialAvailable);
}

function parseAvailableToEvents(
  available: WeeklySchedule["available"],
): Event[] {
  return Object.entries(available).flatMap(([day, hours]) => {
    return hours.map((hour) => {
      const { startTime, endTime } = hour;
      const [startTimeHours, startTimeMinutes] = startTime.split(":");
      const [endTimeHours, endTimeMinutes] = endTime.split(":");

      return {
        id: uuid(),
        start: dayjs()
          .day(Number(day))
          .hour(Number(startTimeHours))
          .minute(Number(startTimeMinutes))
          .toDate(),
        end: dayjs()
          .day(Number(day))
          .hour(Number(endTimeHours))
          .minute(Number(endTimeMinutes))
          .toDate(),
      };
    });
  });
}

export default WeeklyScheduleCalendar;
