import dayjs from "dayjs";
import {
  Calendar as BigCalendar,
  Views,
  dayjsLocalizer,
  DateRange,
} from "react-big-calendar";
import { v4 as uuid } from "uuid";
import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  CSSProperties,
} from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SpecificAvailability } from "../../../../types";
import { FlexibleReservationData } from "../../types";
import useSchedule from "../../details-page/useSchedule";
import "../../css/react-big-calendar.css";
import CustomToolbar from "./CustomCalendarToolbar";

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
  availabilityList: SpecificAvailability[];
  prepareFlexibleReservation: (data: FlexibleReservationData) => void;
  availabilityChecked: boolean; // state in parent as userCount is also connected
  setAvailabilityChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export function FreeRangesCalendar({
  itemId,
  userCount,
  prepareFlexibleReservation,
  availabilityList,
  availabilityChecked,
  setAvailabilityChecked,
}: FreeRangesCalendarProps) {
  const theme = useTheme();
  const { mutate, data: responseData, isError } = useSchedule();

  const [events, setEvents] = useState<Event[]>([]);
  const [backgroundEvents, setBackgroundEvents] = useState<Event[]>([]);
  const [within, setWithin] = useState(true);

  const defaultDate = useMemo(() => new Date(), []);

  useEffect(() => {
    setBackgroundEvents(transformToArray(availabilityList));
  }, [availabilityList]);

  useEffect(() => {
    if (responseData) {
      const newAvailabilityList = responseData.schedule.map(
        (item: SpecificAvailability) => ({
          id: uuid(),
          start: new Date(item.startDateTime),
          end: new Date(item.endDateTime),
          type: item.type,
        }),
      );
      // update background event with new availability array
      setBackgroundEvents(newAvailabilityList);
      setAvailabilityChecked(true);
    }

    if (isError) {
      console.error("An error occurred while checking availability.");
    }
  }, [responseData, isError, itemId, setAvailabilityChecked]);

  // transforms SpecificAvailability[] to events
  const transformToArray = (
    specificAvailabilities: SpecificAvailability[],
  ): Event[] => {
    return specificAvailabilities.map((item) => ({
      id: uuid(),
      start: new Date(item.startDateTime),
      end: new Date(item.endDateTime),
      type: item.type,
    }));
  };

  const hasContinuousCoverage = useCallback(
    (start: Date, end: Date) => {
      // Find events from the same day.
      const sameDayEvents = events.filter((e) =>
        dayjs(e.start).isSame(start, "day"),
      );

      if (events.length > 0 && sameDayEvents.length === 0) {
        return false;
      }

      // Determine earliest and latest times from the same-day events and the new event.
      const earliestStart = Math.min(
        ...sameDayEvents.map((e) => e.start.getTime()),
        start.getTime(),
      );
      const latestEnd = Math.max(
        ...sameDayEvents.map((e) => e.end.getTime()),
        end.getTime(),
      );

      // Filter relevant background events that fall between the earliest start and latest end.
      const relevantBackgroundEvents = backgroundEvents
        .filter(
          (e) =>
            e.end > new Date(earliestStart) && e.start < new Date(latestEnd),
        )
        .sort((a, b) => a.start.getTime() - b.start.getTime());

      let coverageEnd = earliestStart;

      // Check if each event starts where the last one ended to ensure continuous coverage
      return (
        relevantBackgroundEvents.every((bgEvent, index) => {
          if (index === 0 && bgEvent.start.getTime() > coverageEnd) {
            return false;
          }

          if (
            index > 0 &&
            bgEvent.start.getTime() !==
              relevantBackgroundEvents[index - 1].end.getTime()
          ) {
            return false; // gap detected
          }

          coverageEnd = bgEvent.end.getTime();
          return true;
        }) && coverageEnd >= latestEnd
      );
    },
    [backgroundEvents, events],
  );

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const endInMorning = backgroundEvents.find((e) => {
        return end >= e.start && end <= e.end && e.type === "morning";
      });
      if (endInMorning) return;

      const startInMorning = backgroundEvents.find((e) => {
        return start >= e.start && start <= e.end && e.type === "morning";
      });

      let newEventStart = startInMorning ? startInMorning.end : start;

      const startTypeSlotEvent = backgroundEvents.find((e) => {
        return (
          newEventStart >= e.start &&
          newEventStart <= e.end &&
          (e.type === "slot" || e.type === "overnight")
        );
      });

      const endTypeSlotEvent = backgroundEvents.find((e) => {
        return (
          end >= e.start &&
          end <= e.end &&
          (e.type === "slot" || e.type === "overnight")
        );
      });

      newEventStart = startTypeSlotEvent
        ? startTypeSlotEvent.start
        : newEventStart;
      const newEventEnd = endTypeSlotEvent ? endTypeSlotEvent.end : end;

      if (
        events.length > 0 &&
        !hasContinuousCoverage(newEventStart, newEventEnd)
      ) {
        console.warn("Selection is not allowed.");
        return;
      }
      if (
        events.length === 0 &&
        !hasContinuousCoverage(newEventStart, newEventEnd)
      ) {
        console.warn("Selection is not allowed.");
        return;
      }

      const newEvents = [...events];

      if (endTypeSlotEvent?.type === "overnight") {
        const potentialMorningEvent = backgroundEvents.find(
          (e) => e.type === "morning" && e.start > newEventEnd,
        );

        if (potentialMorningEvent) {
          // Check if there's already a userchoice event for the next day and merge if so
          const existingNextDayEvent = newEvents.find((event) =>
            dayjs(event.start).isSame(potentialMorningEvent.start, "day"),
          );

          if (existingNextDayEvent) {
            existingNextDayEvent.start = potentialMorningEvent.start;
          } else {
            newEvents.push({
              id: uuid(),
              start: potentialMorningEvent.start,
              end: potentialMorningEvent.end,
              type: "userchoice",
            });
          }
        }
      }

      // Check if there's already a userchoice event for the day of the selection and merge if so
      const existingDayEvent = newEvents.find((event) =>
        dayjs(event.start).isSame(newEventStart, "day"),
      );

      if (existingDayEvent) {
        existingDayEvent.start = new Date(
          Math.min(existingDayEvent.start.getTime(), newEventStart.getTime()),
        );
        existingDayEvent.end = new Date(
          Math.max(existingDayEvent.end.getTime(), newEventEnd.getTime()),
        );
      } else {
        newEvents.push({
          id: uuid(),
          start: newEventStart,
          end: newEventEnd,
          type: "userchoice",
        });
      }

      setEvents(newEvents);
      setWithin(true);
    },
    [backgroundEvents, events, hasContinuousCoverage],
  );

  const handleSelectEvent = useCallback(
    (event: Event) => {
      if (events.some((e) => e.id === event.id)) {
        setEvents([]);
      }
    },
    [events],
  );

  const earliestStartTime = events.reduce(
    (min, event) => (event.start.getTime() < min ? event.start.getTime() : min),
    Infinity,
  );

  const latestEndTime = events.reduce(
    (max, event) => (event.end.getTime() > max ? event.end.getTime() : max),
    -Infinity,
  );

  const handleSelecting = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      // this shows dimmed selection
      const withinBackgroundEvent = backgroundEvents
        .filter((e) => e.type !== "morning")
        .some((e) => {
          return start >= e.start && end <= e.end;
        });

      if (withinBackgroundEvent) return true;

      const withinAdjacentEvent = backgroundEvents.some((e) => {
        return end >= e.start && end <= e.end;
      });

      if (withinAdjacentEvent) return within;

      setWithin(false);

      // If there are no events, then just check for continuous coverage
      if (events.length === 0) {
        return hasContinuousCoverage(start, end);
      }

      // If there are events, the selection should be adjacent and have continuous coverage
      return hasContinuousCoverage(start, end);
    },
    [backgroundEvents, events.length, hasContinuousCoverage, within],
  );

  // sends request to check availability for new user count
  const handleCheckAvailability = () => {
    setEvents([]);
    mutate({
      amount: userCount,
      itemId,
    });
  };

  const buttonCheck = (
    <Box marginTop={2}>
      {!availabilityChecked && (
        <Button
          variant="contained"
          color="primary"
          disabled={!events[0]?.start || !events[0]?.end}
          onClick={() => handleCheckAvailability()}
        >
          Check Availability
        </Button>
      )}
    </Box>
  );

  const buttonReserve = (
    <Box marginTop={2}>
      {availabilityChecked && (
        <Button
          variant="contained"
          color="primary"
          disabled={!events[0] || !events[0].start || !events[0].end}
          onClick={() =>
            prepareFlexibleReservation({
              start: new Date(earliestStartTime).toISOString(),
              end: new Date(latestEndTime).toISOString(),
              amount: userCount,
            })
          }
        >
          Reserve Item
        </Button>
      )}
    </Box>
  );

  const min = new Date("2023-10-05T04:00:00Z");
  const max = new Date("2023-10-05T21:00:00Z");

  const slots = Math.floor(
    (max.getTime() - min.getTime()) / (1000 * 60 * 60 * 2),
  );

  return (
    <>
      <Box style={{ width: "600px" }}>
        <BigCalendar
          className="reserveCalendar"
          components={{
            toolbar: CustomToolbar,
          }}
          localizer={dayjsLoc}
          backgroundEvents={backgroundEvents}
          defaultDate={defaultDate}
          view={Views.WEEK}
          formats={baseFormats}
          selectable
          min={min}
          max={max}
          getNow={() => new Date()}
          events={events}
          step={15}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onSelecting={handleSelecting}
          timeslots={slots}
          eventPropGetter={(event) => {
            const styles: CSSProperties = {};
            switch (event.type) {
              case "available":
                styles.backgroundColor = "white";
                break;
              case "unavailable":
                styles.backgroundColor = theme.palette.error.main;
                break;
              case "userchoice":
                styles.backgroundColor = theme.palette.primary.main;
                break;
              case "morning":
                styles.display = "none";
                break;
              case "overnight":
                // styles.backgroundColor = "#bbbbbb"
                break;
              default:
                break;
            }

            return {
              className: event.type || "default",
              style: styles,
            };
          }}
        />
      </Box>

      <Typography>
        {events && events[0] && events[0].start && events[0].end
          ? `Wybrano termin: ${events[0].start.toLocaleDateString()} ${events[0].start.toLocaleTimeString()} -  ${events[0].end.toLocaleDateString()} ${events[0].end.toLocaleTimeString()}`
          : "Wybierz termin"}
      </Typography>
      {buttonCheck}
      {buttonReserve}
    </>
  );
}
