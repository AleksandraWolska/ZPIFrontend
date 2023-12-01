import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { FlexibleSchedule } from "../../../../types";
import { BigCalendarEvent } from "./ScheduleCalendar";

export function parseFlexibleScheduleToEvents(
  schedule: FlexibleSchedule,
): BigCalendarEvent[] {
  console.log("schedule", schedule);
  return schedule.scheduledRanges.map((r) => {
    return {
      id: uuid(),
      start: dayjs(r.startDateTime).toDate(),
      end: dayjs(r.endDateTime).toDate(),
    };
  });
}

export function parseEventsToFlexibleSchedule(
  events: BigCalendarEvent[],
): FlexibleSchedule {
  return {
    scheduledRanges: events.map((e) => {
      return {
        startDateTime: e.start.toISOString(),
        endDateTime: e.end.toISOString(),
      };
    }),
  };
}
