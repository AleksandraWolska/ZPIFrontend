import { v4 as uuid } from "uuid";
import ScheduleCalendar, { Event } from "./ScheduleCalendar";
import { SpecificSchedule } from "../../types";
import Granularity from "./Granularity";

export const defaultSpecificSchedule: SpecificSchedule = {
  available: [],
  granularity: 0,
};

function SpecificScheduleCalendar({
  specificSchedule,
  setSchedule,
}: {
  specificSchedule: SpecificSchedule;
  setSchedule: (schedule: SpecificSchedule) => void;
}) {
  return (
    <>
      <Granularity
        granularity={specificSchedule.granularity}
        setGranularity={(granularity: number) =>
          setSchedule({
            ...specificSchedule,
            granularity,
          })
        }
      />

      <ScheduleCalendar
        defaultEvents={parseAvailableToEvents(specificSchedule.available)}
        onEventsChange={(events) =>
          setSchedule({
            ...specificSchedule,
            available: parseEventsToAvailable(events),
          })
        }
        mode="specific"
      />
    </>
  );
}

function parseEventsToAvailable(
  events: Event[],
): SpecificSchedule["available"] {
  return events.map((e) => {
    return {
      startDateTime: e.start.toString(),
      endDateTime: e.end.toString(),
    };
  });
}

function parseAvailableToEvents(
  available: SpecificSchedule["available"],
): Event[] {
  return available.map((e) => {
    return {
      id: uuid(),
      start: new Date(e.startDateTime),
      end: new Date(e.endDateTime),
    };
  });
}

export default SpecificScheduleCalendar;
