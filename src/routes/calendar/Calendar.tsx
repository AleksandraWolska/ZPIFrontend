import dayjs from "dayjs";
import {
  Calendar as BigCalendar,
  Views,
  dayjsLocalizer,
  DateRange,
} from "react-big-calendar";
import { v4 as uuid } from "uuid";

import { useCallback, useEffect, useMemo, useState } from "react";

const dayjsLoc = dayjsLocalizer(dayjs);

type Event = {
  id: string;
  start: Date;
  end: Date;
};

export type CalendarMode = "specific" | "interval";

const baseFormats = {
  timeGutterFormat: "HH:mm",
  eventTimeRangeFormat: (range: DateRange) =>
    `${dayjs(range.start).format("HH:mm")} - ${dayjs(range.end).format(
      "HH:mm",
    )}`,
  selectRangeFormat: (range: DateRange) =>
    `${dayjs(range.start).format("HH:mm")} - ${dayjs(range.end).format(
      "HH:mm",
    )}`,
};

function Calendar({ mode }: { mode: CalendarMode }) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    console.log("OPEN HOURS:", parseEvents(events, mode));
  }, [events, mode]);

  const { formats } = useMemo(() => {
    return mode === "interval"
      ? {
          formats: {
            ...baseFormats,
            dayFormat: "ddd",
          },
        }
      : { formats: baseFormats };
  }, [mode]);

  const components = useMemo(() => {
    return mode === "interval"
      ? {
          toolbar: () => null,
        }
      : {};
  }, [mode]);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      console.log("select slot");
      setEvents((prev) => [...prev, { id: uuid(), start, end }]);
    },
    [setEvents],
  );

  const handleSelectEvent = useCallback(
    (event: Event) => {
      console.log("select event");
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
    },
    [setEvents],
  );

  const handleSelecting = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      console.log("selecting");
      const conflicted = events.some((e) => {
        return (
          (start > e.start && start < e.end) || (end > e.start && end < e.end)
        );
      });
      console.log(conflicted);
      return !conflicted;
    },
    [events],
  );

  return (
    <div style={{ width: "80%", height: "600px" }}>
      <BigCalendar
        localizer={dayjsLoc}
        view={Views.WEEK}
        views={[Views.WEEK]}
        onView={() => {}}
        formats={formats}
        components={components}
        selectable
        events={events}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onSelecting={handleSelecting}
      />
    </div>
  );
}

function parseEvents(events: Event[], mode: CalendarMode) {
  if (mode === "specific") {
    return events.map((e) => {
      const { id, ...rest } = e;
      return rest;
    });
  }

  const weekdays = {} as Record<number, Omit<Event, "id">[]>;

  events.forEach((e) => {
    const weekday = dayjs(e.start).day();
    const { id, ...rest } = e;

    if (!(weekday in weekdays)) {
      weekdays[weekday] = [{ start: rest.start, end: rest.end }];
    } else {
      weekdays[weekday].push(rest);
    }
  });

  return weekdays;
}

export default Calendar;
