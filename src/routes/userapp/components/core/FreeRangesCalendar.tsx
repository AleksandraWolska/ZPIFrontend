import dayjs from "dayjs";
import {
  Calendar as BigCalendar,
  Views,
  dayjsLocalizer,
  DateRange,
} from "react-big-calendar";
import { v4 as uuid } from "uuid";
import { useState, useCallback, useMemo, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SpecificAvailability } from "../../../../types";

const dayjsLoc = dayjsLocalizer(dayjs);

type Event = {
  id: string;
  start: Date;
  end: Date;
  type?: string;
};

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

type FreeRangesCalendarProps = {
  itemId: string;
  userCount: number;
  availability: SpecificAvailability[];
  onAvailabilityChecked: (idx: string, start: string, end: string) => void;
};

export function FreeRangesCalendar({
  itemId,
  userCount,
  onAvailabilityChecked,
  availability,
}: FreeRangesCalendarProps) {
  const [events, setEvents] = useState<Event[]>([]);
  console.log(userCount);
  useEffect(() => {
    console.log("OPEN HOURS:", events);
  }, [events]);

  const theme = useTheme();

  const defaultDate = useMemo(() => new Date(), []);

  const transformToArray = (specificAvailabilities: SpecificAvailability[]) => {
    return specificAvailabilities.map((item) => ({
      id: uuid(),
      start: new Date(item.startDateTime),
      end: new Date(item.endDateTime),
      type: "available",
    }));
  };

  const transformedAvailability = useMemo(
    () => transformToArray(availability),
    [availability],
  );

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const withinBackgroundEvent = transformedAvailability.some((e) => {
        return start >= e.start && end <= e.end;
      });
      if (withinBackgroundEvent) {
        setEvents(() => [{ id: uuid(), start, end, type: "userchoice" }]);
      }
    },
    [setEvents, transformedAvailability],
  );

  const handleSelecting = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const withinBackgroundEvent = transformedAvailability.some((e) => {
        return start >= e.start && end <= e.end;
      });

      return withinBackgroundEvent;
    },
    [transformedAvailability],
  );

  const handleSelectEvent = useCallback(
    (event: Event) => {
      const withinBackgroundEvent = transformedAvailability.some((e) => {
        return event.start >= e.start && event.end <= e.end;
      });

      if (withinBackgroundEvent) {
        setEvents((prev) => prev.filter((e) => e.id !== event.id));
      }
    },
    [transformedAvailability],
  );

  const buttons = (
    <Box marginTop={2}>
      {events[0] && events[0].start && events[0].end && (
        <Button
          variant="contained"
          color="primary"
          disabled={!events[0].start || !events[0].end}
          onClick={() =>
            onAvailabilityChecked(
              itemId,
              events[0].start.toISOString(),
              events[0].end.toISOString(),
            )
          }
        >
          Reserve Item
        </Button>
      )}
    </Box>
  );

  return (
    <>
      <Box style={{ width: "400px", height: "500px" }}>
        Halooo
        <BigCalendar
          localizer={dayjsLoc}
          backgroundEvents={transformedAvailability}
          defaultDate={defaultDate}
          view={Views.WEEK}
          formats={baseFormats}
          components={{}}
          min={new Date("2023-10-05T08:00:00Z")}
          max={new Date("2023-10-05T20:00:00Z")}
          selectable
          getNow={() => new Date()}
          events={events}
          step={15}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onSelecting={handleSelecting}
          style={{ height: "400px" }}
          timeslots={8}
          eventPropGetter={(event) => {
            let color;
            switch (event.type) {
              case "available":
                color = "white";
                break;
              case "unavailable":
                color = theme.palette.error.main;
                break;
              case "userchoice":
                color = theme.palette.primary.main;
                break;
              default:
                color = "white";
                break;
            }

            return {
              className: event.type || "default",
              style: { backgroundColor: color },
            };
          }}
        />
      </Box>

      <Typography>
        {events && events[0] && events[0].start && events[0].end
          ? `Wybrano termin: ${events[0].start.toLocaleDateString()} ${events[0].start.toLocaleTimeString()} -  ${events[0].end.toLocaleDateString()} ${events[0].end.toLocaleTimeString()}`
          : "Wybierz termin"}
      </Typography>
      {buttons}
    </>
  );
}
