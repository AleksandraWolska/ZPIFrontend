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
  useRef,
} from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Availability } from "../../../../types";
import { FlexibleReservationData } from "../../types";
import useSchedule from "../../details-page/useSchedule";
import "../../css/react-big-calendar.css";
import CustomCalendarToolbar from "../detail-page-specific/CustomCalendarToolbar";

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

// transforms SpecificAvailability[] to events
const transformToArray = (specificAvailabilities: Availability[]): Event[] => {
  return specificAvailabilities.map((item) => ({
    id: uuid(),
    start: new Date(item.startDateTime),
    end: new Date(item.endDateTime),
    type: item.type,
  }));
};

type FreeRangesCalendarProps = {
  itemId: string;
  earliestCalendarStart: number;
  latestCalendarEnd: number;
  userCount: number;
  availabilityList: Availability[];
  prepareFlexibleReservation: (data: FlexibleReservationData) => void;
  availabilityChecked: boolean; // state in parent as userCount is also connected
  setAvailabilityChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export function FreeRangesCalendar({
  itemId,
  userCount,
  earliestCalendarStart,
  latestCalendarEnd,
  prepareFlexibleReservation,
  availabilityList,
  availabilityChecked,
  setAvailabilityChecked,
}: FreeRangesCalendarProps) {
  const theme = useTheme();
  const { mutate, data: responseData, isError } = useSchedule();

  const [events, setEvents] = useState<Event[]>([]);
  const backgroundEventsRef = useRef<Event[]>(
    transformToArray(availabilityList),
  );
  const [within, setWithin] = useState(true);

  const defaultDate = useMemo(() => new Date(), []);

  useEffect(() => {
    if (responseData) {
      const newAvailabilityList = responseData.schedule.map(
        (item: Availability) => ({
          id: uuid(),
          start: new Date(item.startDateTime),
          end: new Date(item.endDateTime),
          type: item.type,
        }),
      );
      // update background event with new availability array
      backgroundEventsRef.current = newAvailabilityList;
      // setBackgroundEvents(newAvailabilityList);
      setAvailabilityChecked(true);
    }

    if (isError) {
      console.error("An error occurred while checking availability.");
    }
  }, [responseData, isError, itemId, setAvailabilityChecked]);

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
      const relevantBackgroundEvents = backgroundEventsRef.current
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
    [events],
  );

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const endInMorning = backgroundEventsRef.current.find((e) => {
        return end >= e.start && end <= e.end && e.type === "morning";
      });
      if (endInMorning) return;

      const startInMorning = backgroundEventsRef.current.find((e) => {
        return start >= e.start && start <= e.end && e.type === "morning";
      });

      let newEventStart = startInMorning ? startInMorning.end : start;

      const startTypeSlotEvent = backgroundEventsRef.current.find((e) => {
        return (
          newEventStart >= e.start &&
          newEventStart <= e.end &&
          (e.type === "slot" || e.type === "overnight")
        );
      });

      const endTypeSlotEvent = backgroundEventsRef.current.find((e) => {
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
        const potentialMorningEvent = backgroundEventsRef.current.find(
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
    [events, hasContinuousCoverage],
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
      const withinBackgroundEvent = backgroundEventsRef.current
        .filter((e) => e.type !== "morning")
        .some((e) => {
          return start >= e.start && end <= e.end;
        });

      if (withinBackgroundEvent) return true;

      const withinAdjacentEvent = backgroundEventsRef.current.some((e) => {
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
    [events.length, hasContinuousCoverage, within],
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
          disabled={!events[0] || !events[0]?.start || !events[0]?.end}
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

  if (!availabilityList.length)
    return <Typography>No available time slots</Typography>;

  return (
    <>
      <Box style={{ width: "90%" }}>
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="overline">
            {events && events[0] && events[0].start && events[0].end
              ? `Chosen: ${events[0].start.toLocaleString()}  -  ${events[0].end.toLocaleString()} `
              : "Choose desired reservation time"}
          </Typography>
        </Box>
        <BigCalendar
          className="reserveCalendar"
          components={{
            toolbar: CustomCalendarToolbar,
          }}
          localizer={dayjsLoc}
          backgroundEvents={backgroundEventsRef.current}
          defaultDate={defaultDate}
          view={Views.WEEK}
          formats={baseFormats}
          selectable
          min={
            new Date(
              new Date(0).setHours(
                earliestCalendarStart <= 1 ? 1 : earliestCalendarStart - 1,
              ),
            )
          }
          max={
            new Date(
              new Date(0).setHours(
                latestCalendarEnd >= 22 ? 24 : latestCalendarEnd + 2,
              ),
            )
          }
          getNow={() => new Date()}
          events={events}
          step={5}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onSelecting={handleSelecting}
          timeslots={12}
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

      {buttonCheck}
      {buttonReserve}
    </>
  );
}
