import { useCallback } from "react";
import dayjs from "dayjs";
import {
  Calendar as BigCalendar,
  Views,
  dayjsLocalizer,
  DateRange,
} from "react-big-calendar";
import { v4 as uuid } from "uuid";

import "./calendar.css";

const dayjsLoc = dayjsLocalizer(dayjs);

export type Event = {
  id: string;
  start: Date;
  end: Date;
};

const formats = {
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

function ScheduleCalendar({
  events,
  onEventsChange,
  step,
}: {
  events: Event[];
  onEventsChange: (events: Event[]) => void;
  step?: number;
}) {
  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      console.log("select slot");
      const newEvents = [...events, { id: uuid(), start, end }];
      onEventsChange(newEvents);
    },
    [events, onEventsChange],
  );

  const handleSelectEvent = useCallback(
    (event: Event) => {
      console.log("select event");
      const newEvents = events.filter((e) => e.id !== event.id);
      onEventsChange(newEvents);
    },
    [events, onEventsChange],
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
    <div style={{ height: "600px" }}>
      <BigCalendar
        localizer={dayjsLoc}
        view={Views.WEEK}
        views={[Views.WEEK]}
        onView={() => {}}
        formats={formats}
        selectable
        events={events}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onSelecting={handleSelecting}
        timeslots={1}
        step={step}
      />
    </div>
  );
}

ScheduleCalendar.defaultProps = {
  step: 30,
};

export default ScheduleCalendar;
