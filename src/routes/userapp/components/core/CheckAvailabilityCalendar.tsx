import dayjs from "dayjs";
import "dayjs/locale/en-gb";
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
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Availability } from "../../../../types";
import useAvailabilityCheck from "../../details-page/useAvailabilityCheck";
import {
  CheckAvailabilityResponseSuggestion,
  FlexibleReservationData,
} from "../../types";
import "../../css/react-big-calendar.css";
import CustomCalendarToolbar from "../detail-page-specific/CustomCalendarToolbar";
import { SuggestedDatesDialog } from "../detail-page-specific/SuggestedDatesDialog";

dayjs.locale("en-gb");
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

type CheckAvailabilityCalendarProps = {
  itemId: string;
  earliestCalendarStart: number;
  latestCalendarEnd: number;
  userCount: number;
  availabilityList: Availability[]; // schedule that comes with itemStatus
  prepareFlexibleReservation: (data: FlexibleReservationData) => void; // function called on reserve button click, after ensuring availability
  availabilityChecked: boolean; // state in parent as userCount is also connected
  setAvailabilityChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CheckAvailabilityCalendar({
  itemId,
  userCount,
  earliestCalendarStart,
  latestCalendarEnd,
  prepareFlexibleReservation,
  availabilityList,
  availabilityChecked,
  setAvailabilityChecked,
}: CheckAvailabilityCalendarProps) {
  const theme = useTheme();
  const { mutate, data: responseData, isError } = useAvailabilityCheck();

  const [events, setEvents] = useState<Event[]>([]);
  const backgroundEventsRef = useRef<Event[]>(
    transformToArray(availabilityList),
  );

  const [showSuggestedDialog, setShowSuggestedDialog] = useState(false);
  const [showReserveDialog, setShowReserveDialog] = useState(false);

  const [isFromResponse, setIsFromResponse] = useState<boolean>(false);
  const defaultDate = useMemo(() => new Date(), []);
  const [reserveData, setReserveData] =
    useState<null | FlexibleReservationData>(null);
  const [within, setWithin] = useState(true);

  // if response is not an array, and has start date, then it is ok, ready to reserve
  // if response will be an array, then it is suggested dates
  useEffect(() => {
    if (responseData && !Array.isArray(responseData) && responseData.start) {
      setReserveData({
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

  const handleReset = () => {
    // back to original availability (from item details)
    backgroundEventsRef.current = transformToArray(availabilityList);
    setEvents([]);
    setIsFromResponse(false);
    setAvailabilityChecked(false);
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
    [events, hasContinuousCoverage, isFromResponse, setAvailabilityChecked],
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
      const withinBackgroundEvent = backgroundEventsRef.current.some((e) => {
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
        (item: Availability) => ({
          id: uuid(),
          start: new Date(item.startDateTime),
          end: new Date(item.endDateTime),
          type: "available",
        }),
      );
      console.log(
        `newAvailabilityList: ${JSON.stringify(newAvailabilityList)}`,
      );

      // background events restrict clickable user choice
      // this ensures evary new user chosen date would be available
      // use availability from suggested date (now for only 1 instance of item, so user can freely reserve
      backgroundEventsRef.current = newAvailabilityList;
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
      {shouldEnableReserve && (
        <Button
          variant="contained"
          color="primary"
          disabled={!events[0] || !events[0].start || !events[0].end}
          onClick={() => {
            setShowReserveDialog(false);
            prepareFlexibleReservation({
              start: new Date(earliestStartTime).toISOString(),
              end: new Date(latestEndTime).toISOString(),
              amount: userCount,
            });
          }}
        >
          Reserve Item
        </Button>
      )}
    </Box>
  );

  const buttonReset = (
    <Box marginTop={2}>
      <Button variant="outlined" color="primary" onClick={handleReset}>
        RESET
      </Button>
    </Box>
  );

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
          min={new Date(new Date(0).setHours(earliestCalendarStart))}
          max={new Date(new Date(0).setHours(latestCalendarEnd))}
          selectable
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
      {buttonReset}
      {Array.isArray(responseData) && showSuggestedDialog && (
        <SuggestedDatesDialog
          setShowSuggestedDialog={() => setShowSuggestedDialog(false)}
          responseSuggestions={responseData}
          handleSuggestedDateClick={handleSuggestedDateClick}
        />
      )}
      {reserveData && (
        <Dialog
          open={showReserveDialog}
          onClose={() => setShowReserveDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: { borderRadius: "10px" } }}
        >
          <DialogTitle sx={{ textAlign: "center", fontWeight: "medium" }}>
            <Typography variant="h4">Available</Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: "center" }}>
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Item is available in chosen time ranges
              </Typography>

              <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

              <Typography margin="auto">
                {`Start: ${new Date(reserveData.start).toLocaleString()}`}
              </Typography>
              <Typography margin="auto">
                {`End: ${new Date(reserveData.end).toLocaleString()}`}
              </Typography>

              <Divider sx={{ marginTop: 2 }} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                width: " 100%",
                display: "flex",
                flexDirection: "row",
                pt: 2,
              }}
            >
              <Button
                color="primary"
                variant="outlined"
                sx={{ flex: 1, m: 1 }}
                onClick={() => setShowReserveDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ flex: 1, m: 1 }}
                disabled={!events[0] || !events[0].start || !events[0].end}
                onClick={() => {
                  setShowReserveDialog(false);
                  prepareFlexibleReservation({
                    start: new Date(earliestStartTime).toISOString(),
                    end: new Date(latestEndTime).toISOString(),
                    amount: userCount,
                  });
                }}
              >
                Reserve
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
