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
import { FlexibleReservationData } from "../../types";
import useSchedule from "../../details-page/useSchedule";

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

  // const isAdjacentToExistingEvents = (start: Date, end: Date) => {
  //   return events.some(
  //     (event) =>
  //       event.start.getTime() === end.getTime() ||
  //       event.end.getTime() === start.getTime(),
  //   );
  // };

  const hasContinuousCoverage = useCallback(
    (start: Date, end: Date) => {
      // Find events from the same day.
      const sameDayEvents = events.filter((e) =>
        dayjs(e.start).isSame(start, "day"),
      );

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

      let coverageStart = earliestStart;

      for (const bgEvent of relevantBackgroundEvents) {
        if (bgEvent.start.getTime() > coverageStart) {
          return false; // gap detected
        }
        if (bgEvent.end.getTime() > coverageStart) {
          coverageStart = bgEvent.end.getTime();
        }
      }

      return coverageStart >= latestEnd;
    },
    [backgroundEvents, events],
  );

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

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      // New: Check if the selection is allowed, if not, return early.

      const startTypeSlotEvent = backgroundEvents.find((e) => {
        return (
          start >= e.start &&
          start <= e.end &&
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
      if (
        events.length > 0 &&
        !hasContinuousCoverage(
          startTypeSlotEvent ? startTypeSlotEvent.start : start,
          endTypeSlotEvent ? endTypeSlotEvent.end : end,
        )
      ) {
        console.warn("Selection is not allowed.");
        return;
      }
      if (
        events.length === 0 &&
        !hasContinuousCoverage(
          startTypeSlotEvent ? startTypeSlotEvent.start : start,
          endTypeSlotEvent ? endTypeSlotEvent.end : end,
        )
      ) {
        console.warn("Selection is not allowed.");
        return;
      }

      const newEventStart = startTypeSlotEvent
        ? startTypeSlotEvent.start
        : start;
      const newEventEnd = endTypeSlotEvent ? endTypeSlotEvent.end : end;

      let newEvents = [...events];

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

  const handleSelecting = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      // If there are no events, then just check for continuous coverage
      if (events.length === 0) {
        return hasContinuousCoverage(start, end);
      }

      // If there are events, the selection should be adjacent and have continuous coverage
      return hasContinuousCoverage(start, end);
    },
    [events.length, hasContinuousCoverage],
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
              itemId,
              start: events[0].start.toISOString(),
              end: events[0].end.toISOString(),
              amount: userCount,
            })
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
        <BigCalendar
          localizer={dayjsLoc}
          backgroundEvents={backgroundEvents}
          defaultDate={defaultDate}
          view={Views.WEEK}
          formats={baseFormats}
          components={{}}
          selectable
          getNow={() => new Date()}
          events={events}
          step={15}
          onSelectSlot={handleSelectSlot}
          // onSelectEvent={handleSelectEvent}
          onSelecting={handleSelecting}
          style={{ height: "600px" }}
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
      {buttonCheck}
      {buttonReserve}
    </>
  );
}
