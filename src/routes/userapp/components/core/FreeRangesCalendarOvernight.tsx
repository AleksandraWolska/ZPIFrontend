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

  const findClosestMorningEvent = (afterDate: Date): Event | undefined => {
    // Filter out events that are "morning" and start after the given date.
    const potentialMorningEvents = backgroundEvents.filter(
      (e) => e.type === "morning" && e.start > afterDate,
    );

    // Sort by start date to get the closest.
    potentialMorningEvents.sort((a, b) => (a.start > b.start ? 1 : -1));

    // Return the closest one, if it exists.
    return potentialMorningEvents[0];
  };

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const startTypeSlotEvent = backgroundEvents.find((e) => {
        return (
          start >= e.start &&
          start <= e.end &&
          (e.type === "slot" || e.type === "overnight")
        );
      });
      console.log("handle select slot");
      const endTypeSlotEvent = backgroundEvents.find((e) => {
        return (
          end >= e.start &&
          end <= e.end &&
          (e.type === "slot" || e.type === "overnight")
        );
      });

      const newEvent: Event = {
        id: uuid(),
        start: startTypeSlotEvent ? startTypeSlotEvent.start : start,
        end: endTypeSlotEvent ? endTypeSlotEvent.end : end,
        type: "userchoice",
      };
      setEvents((prev) => [...prev, newEvent]);

      if (endTypeSlotEvent?.type === "overnight") {
        const potentialMorningEvents = backgroundEvents.filter(
          (e) => e.type === "morning" && e.start > newEvent.end,
        );
        potentialMorningEvents.sort((a, b) => (a.start > b.start ? 1 : -1));

        if (potentialMorningEvents[0]) {
          setEvents((prev) => [...prev, potentialMorningEvents[0]]);
        }
      }

      setWithin(true);
    },
    [backgroundEvents],
  );
  const [within, setWithin] = useState(true);

  const handleSelecting = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const withinBackgroundEvent = backgroundEvents.some((e) => {
        return start >= e.start && end <= e.end;
      });

      if (withinBackgroundEvent) return true;

      const withinAdjacentEvent = backgroundEvents.some((e) => {
        return end >= e.start && end <= e.end;
      });

      if (withinAdjacentEvent) return within;

      setWithin(false);
      return false;
    },
    [backgroundEvents, within],
  );

  // const handleSelectEvent = useCallback(
  //   (event: Event) => {
  //   //   const startTypeSlotEvent = backgroundEvents.find((e) => {
  //   //     return (
  //   //       event.start >= e.start &&
  //   //       event.start <= e.end &&
  //   //       (e.type === "slot" || e.type === "overnight")
  //   //     );
  //   //   });
  //   //   console.log("handle select event");
  //   //   const endTypeSlotEvent = backgroundEvents.find((e) => {
  //   //     return (
  //   //       event.end >= e.start &&
  //   //       event.end <= e.end &&
  //   //       (e.type === "slot" || e.type === "overnight")
  //   //     );
  //   //   });
  //   //   const newEvent: Event = {
  //   //     id: uuid(),
  //   //     start: startTypeSlotEvent ? startTypeSlotEvent.start : event.start,
  //   //     end: endTypeSlotEvent ? endTypeSlotEvent.end : event.end,
  //   //     type: "userchoice",
  //   //   };
  //   //   setEvents((prev) => [...prev, newEvent]);
  //   //   if (endTypeSlotEvent?.type === "overnight") {
  //   //     const potentialMorningEvents = backgroundEvents.filter(
  //   //       (e) => e.type === "morning" && e.start > newEvent.end,
  //   //     );
  //   //     potentialMorningEvents.sort((a, b) => (a.start > b.start ? 1 : -1));

  //   //     if (potentialMorningEvents[0]) {
  //   //       setEvents((prev) => [...prev, potentialMorningEvents[0]]);
  //   //     }
  //   //   }
  //   //   setWithin(true);
  //   },

  //   [backgroundEvents],
  // );

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
