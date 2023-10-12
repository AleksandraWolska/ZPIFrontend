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

import "./react-big-calendar.css";

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

  useEffect(() => {
    setBackgroundEvents(transformToArray(availabilityList));
  }, [availabilityList]);

  // transforms SpecificAvailability[] to events
  const transformToArray = (
    specificAvailabilities: SpecificAvailability[],
  ): Event[] => {
    return specificAvailabilities.map((item) => ({
      id: uuid(),
      start: new Date(item.startDateTime),
      end: new Date(item.endDateTime),
      type: "available",
    }));
  };

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const withinBackgroundEvent = backgroundEvents.some((e) => {
        return start >= e.start && end <= e.end;
      });
      if (withinBackgroundEvent) {
        setEvents(() => [{ id: uuid(), start, end, type: "userchoice" }]);
        setAvailabilityChecked(isFromResponse);
      }
    },
    [backgroundEvents, isFromResponse, setAvailabilityChecked],
  );

  const handleSelecting = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const withinBackgroundEvent = backgroundEvents.some((e) => {
        return start >= e.start && end <= e.end;
      });

      return withinBackgroundEvent;
    },
    [backgroundEvents],
  );

  const handleSelectEvent = useCallback(
    (event: Event) => {
      const withinBackgroundEvent = backgroundEvents.some((e) => {
        return event.start >= e.start && event.end <= e.end;
      });

      if (withinBackgroundEvent) {
        setEvents((prev) => prev.filter((e) => e.id !== event.id));
      }
    },
    [backgroundEvents],
  );

  // for buttons Reserve/CheckAvailability display
  const shouldEnableReserve =
    (isFromResponse && availabilityChecked) || availabilityChecked;

  // sends request to check chosen availability for amount of users
  const handleCheckAvailability = () => {
    mutate({
      startDate: events[0].start.toISOString(),
      endDate: events[0].end.toISOString(),
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
          localizer={dayjsLoc}
          backgroundEvents={backgroundEvents}
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
