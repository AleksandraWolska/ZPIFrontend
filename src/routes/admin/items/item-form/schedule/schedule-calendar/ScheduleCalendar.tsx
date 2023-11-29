import { useCallback } from "react";
import dayjs from "dayjs";
import {
  Calendar as BigCalendar,
  DateRange,
  dayjsLocalizer,
  Views,
} from "react-big-calendar";
import { v4 as uuid } from "uuid";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import "./calendar.css";

const DnDCalendar = withDragAndDrop(BigCalendar);

const dayjsLoc = dayjsLocalizer(dayjs);

export type BigCalendarEvent = {
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
  events: BigCalendarEvent[];
  onEventsChange: (events: BigCalendarEvent[]) => void;
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
    (event: object) => {
      if (!("id" in event)) return;
      console.log("select event");
      const newEvents = events.filter((e) => e.id !== event.id);
      onEventsChange(newEvents);
    },
    [events, onEventsChange],
  );

  const handleSelecting = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      console.log("selecting");
      return !conflicted({ start, end }, events);
    },
    [events],
  );

  const handleEventResize = (args: EventInteractionArgs<object>) => {
    console.log("resize", args);
    const event = args.event as BigCalendarEvent;

    if (
      conflicted(
        {
          start: new Date(args.start),
          end: new Date(args.end),
        },
        events.filter((e) => e.id !== event.id),
      )
    ) {
      return;
    }

    const newEvents = events.map((e) => {
      if (e.id === event.id) {
        return {
          ...e,
          start: new Date(args.start),
          end: new Date(args.end),
        };
      }
      return e;
    });
    onEventsChange(newEvents);
  };

  return (
    <DnDCalendar
      localizer={dayjsLoc}
      view={Views.WEEK}
      views={[Views.WEEK]}
      onView={() => {}}
      formats={formats}
      min={new Date(new Date(0).setHours(1))}
      max={new Date(new Date(0).setHours(23))}
      selectable
      events={events}
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      onSelecting={handleSelecting}
      timeslots={step ? 60 / step : 1}
      step={step}
      onEventResize={handleEventResize}
      className="scheduleCalendar"
    />
  );
}

function conflicted(
  event: Omit<BigCalendarEvent, "id">,
  otherEvents: BigCalendarEvent[],
) {
  return otherEvents.some((e) => {
    return event.start < e.end && e.start < event.end;
  });
}

ScheduleCalendar.defaultProps = {
  step: 30,
};

export default ScheduleCalendar;
