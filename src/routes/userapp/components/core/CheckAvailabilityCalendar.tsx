import dayjs from "dayjs";
import {
  Calendar as BigCalendar,
  Views,
  dayjsLocalizer,
  DateRange,
} from "react-big-calendar";
import { v4 as uuid } from "uuid";
import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SpecificAvailability } from "../../../../types";
import useAvailabilityCheck from "../../details-page/useAvailabilityCheck";
import {
  CheckAvailabilityResponseSuggestion,
  FlexibleReservationData,
} from "../../types";
import "../../css/react-big-calendar.css";

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

type CheckAvailabilityCalendarProps = {
  itemId: string;
  userCount: number;
  availabilityList: SpecificAvailability[]; // schedule that comes with itemStatus
  prepareFlexibleReservation: (data: FlexibleReservationData) => void; // function called on reserve button click, after ensuring availability
  availabilityChecked: boolean; // state in parent as userCount is also connected
  setAvailabilityChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CheckAvailabilityCalendar({
  itemId,
  userCount,
  prepareFlexibleReservation,
  availabilityList,
  availabilityChecked,
  setAvailabilityChecked,
}: CheckAvailabilityCalendarProps) {
  const theme = useTheme();
  const { mutate, data: responseData, isError } = useAvailabilityCheck();

  const [events, setEvents] = useState<Event[]>([]);
  const [backgroundEvents, setBackgroundEvents] = useState<Event[]>([]);

  const [showSuggestedDialog, setShowSuggestedDialog] = useState(false);
  const [showReserveDialog, setShowReserveDialog] = useState(false);

  const [isFromResponse, setIsFromResponse] = useState<boolean>(false);
  const defaultDate = useMemo(() => new Date(), []);
  const [reserveData, setReserveData] =
    useState<null | FlexibleReservationData>(null);
  const [within, setWithin] = useState(true);

  useEffect(() => {
    setBackgroundEvents(transformToArray(availabilityList));
  }, [availabilityList]);
  // if response is not an array, and has start date, then it is ok, ready to reserve
  // if response will be an array, then it is suggested dates
  useEffect(() => {
    if (responseData && !Array.isArray(responseData) && responseData.start) {
      setReserveData({
        itemId,
        start: responseData.start,
        end: responseData.end,
        amount: responseData.amount,
      });
      setAvailabilityChecked(true);
      setShowReserveDialog(true);
    }

    if (responseData && Array.isArray(responseData)) {
      setShowSuggestedDialog(true);
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
        setAvailabilityChecked(isFromResponse);
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
    [
      backgroundEvents,
      events,
      hasContinuousCoverage,
      isFromResponse,
      setAvailabilityChecked,
    ],
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
      const withinBackgroundEvent = backgroundEvents.some((e) => {
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

  const handleSelectEvent = useCallback(
    (event: Event) => {
      if (events.some((e) => e.id === event.id)) {
        setEvents([]);
      }
    },
    [events],
  );

  // for buttons Reserve/CheckAvailability display
  const shouldEnableReserve =
    (isFromResponse && availabilityChecked) || availabilityChecked;

  // sends request to check chosen availability for amount of users
  const handleCheckAvailability = () => {
    mutate({
      startDate: new Date(earliestStartTime).toISOString(),
      endDate: new Date(latestEndTime).toISOString(),
      amount: userCount,
      itemId,
    });
  };

  const handleSuggestedDateClick = useCallback(
    (idx: string) => {
      const suggestedDate = responseData.find(
        (suggestion: CheckAvailabilityResponseSuggestion) =>
          suggestion.id === idx,
      );

      if (!suggestedDate) return;
      // set event to suggestedd start and end date
      setEvents(() => [
        {
          id: uuid(),
          start: new Date(suggestedDate.suggestedStart),
          end: new Date(suggestedDate.suggestedEnd),
          type: "userchoice",
        },
      ]);

      // Update the availabilityList with the new schedule from corresponding suggested date
      const newAvailabilityList = suggestedDate.schedule.map(
        (item: SpecificAvailability) => ({
          id: uuid(),
          start: new Date(item.startDateTime),
          end: new Date(item.endDateTime),
          type: "available",
        }),
      );
      // background events restrict clickable user choice
      // this ensures evary new user chosen date would be available
      setBackgroundEvents(newAvailabilityList);
      setIsFromResponse(true);
      setShowSuggestedDialog(false);
      setAvailabilityChecked(true);
    },
    [responseData, setAvailabilityChecked],
  );

  const buttonCheck = (
    <Box marginTop={2}>
      {!shouldEnableReserve && (
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
      {shouldEnableReserve && events[0] && events[0].start && events[0].end && (
        <Button
          variant="contained"
          color="primary"
          disabled={!events[0].start || !events[0].end}
          onClick={() =>
            prepareFlexibleReservation({
              itemId,
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

  const buttonReset = (
    <Box marginTop={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setBackgroundEvents(transformToArray(availabilityList));
          setEvents([]);
          setIsFromResponse(false);
          setAvailabilityChecked(false);
        }}
      >
        RESET
      </Button>
    </Box>
  );

  return (
    <>
      <Box style={{ width: "400px", height: "500px" }}>
        Halooo
        <BigCalendar
          className="reserveCalendar"
          localizer={dayjsLoc}
          backgroundEvents={backgroundEvents}
          defaultDate={defaultDate}
          view={Views.WEEK}
          formats={baseFormats}
          components={{}}
          min={new Date("2023-10-05T04:00:00Z")}
          max={new Date("2023-10-05T21:00:00Z")}
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
      {buttonCheck}
      {buttonReserve}
      {buttonReset}
      {Array.isArray(responseData) && (
        <Dialog
          open={showSuggestedDialog}
          onClose={() => setShowSuggestedDialog(false)}
        >
          <DialogTitle>
            Niestety, ten termin nie jest dostępny, może któryś z poniższych Cię
            zainteresuje?
          </DialogTitle>
          <DialogContent>
            <List>
              {responseData?.map(
                (suggestion: CheckAvailabilityResponseSuggestion) => (
                  <ListItem
                    button
                    key={suggestion.id}
                    onClick={() => handleSuggestedDateClick(suggestion.id)}
                  >
                    <ListItemText
                      primary={`Start: ${dayjs(
                        suggestion.suggestedStart,
                      ).format("YYYY-MM-DD HH:mm")}, End: ${dayjs(
                        suggestion.suggestedEnd,
                      ).format("YYYY-MM-DD HH:mm")}`}
                    />
                  </ListItem>
                ),
              )}
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setShowSuggestedDialog(false)}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Dialog
        open={showReserveDialog}
        onClose={() => setShowReserveDialog(false)}
      >
        <DialogTitle>Wybrany termin jest dostępny do rezerwacji!</DialogTitle>
        <DialogContent>
          <Typography>
            Start:{" "}
            {reserveData
              ? dayjs(reserveData.start).format("YYYY-MM-DD HH:mm")
              : ""}
          </Typography>
          <Typography>
            End:{" "}
            {reserveData
              ? dayjs(reserveData.end).format("YYYY-MM-DD HH:mm")
              : ""}
          </Typography>
        </DialogContent>
        <DialogActions>
          {buttonReserve}
          <Button onClick={() => setShowReserveDialog(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
