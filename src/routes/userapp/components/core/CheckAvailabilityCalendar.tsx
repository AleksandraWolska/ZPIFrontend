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

const dayjsLoc = dayjsLocalizer(dayjs);

type Event = {
  id: string;
  start: Date;
  end: Date;
  type?: string;
  mine?: boolean;
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
  availability: SpecificAvailability[];
  onAvailabilityChecked: (idx: string, start: string, end: string) => void;
  availabilityChecked: boolean;
  setAvailabilityChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CheckAvailabilityCalendar({
  itemId,
  userCount,
  onAvailabilityChecked,
  availability,
  availabilityChecked,
  setAvailabilityChecked,
}: CheckAvailabilityCalendarProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [showSuggestedDialog, setShowSuggestedDialog] = useState(false);

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

  const suggestedDateRanges = useMemo(() => {
    if (!events[0]) return [];

    return [
      { idx: "1", startOffset: 0.5, endOffset: 0.5 },
      { idx: "2", startOffset: 1, endOffset: 1 },
      { idx: "3", startOffset: 2, endOffset: 2 },
    ].map((range) => ({
      idx: range.idx,
      start: dayjs(events[0].start).add(range.startOffset, "hour"),
      end: dayjs(events[0].end).add(range.endOffset, "hour"),
    }));
  }, [events]);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const withinBackgroundEvent = transformedAvailability.some((e) => {
        return start >= e.start && end <= e.end;
      });
      if (withinBackgroundEvent) {
        setEvents(() => [{ id: uuid(), start, end, type: "userchoice" }]);
        setAvailabilityChecked(false);
      }
    },
    [setEvents, setAvailabilityChecked, transformedAvailability],
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

  const handleCheckAvailability = () => {
    console.log(userCount);
    setShowSuggestedDialog(true);
  };

  const handleSuggestedDateClick = useCallback(
    (idx: string) => {
      const suggestedDate = suggestedDateRanges.find(
        (range) => range.idx === idx,
      );

      if (!suggestedDate) return;
      setEvents(() => [
        {
          id: uuid(),
          start: suggestedDate.start?.toDate(),
          end: suggestedDate.end?.toDate(),
        },
      ]);
      setShowSuggestedDialog(false);
      setAvailabilityChecked(true);
    },
    [setAvailabilityChecked, suggestedDateRanges],
  );

  const buttons = (
    <Box marginTop={2}>
      {!availabilityChecked && (
        <Button
          variant="contained"
          color="primary"
          disabled={!events[0] || !events[0].start || !events[0].end}
          onClick={() => handleCheckAvailability()}
        >
          Check Availability
        </Button>
      )}
      {availabilityChecked && events[0] && events[0].start && events[0].end && (
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
            // color set here to match page theme
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
      <Dialog
        open={showSuggestedDialog}
        onClose={() => setShowSuggestedDialog(false)}
      >
        <DialogTitle>Suggested Times</DialogTitle>
        <DialogContent>
          <List>
            {suggestedDateRanges.map((range) => (
              <ListItem
                button
                key={range.idx}
                onClick={() => handleSuggestedDateClick(range.idx)}
              >
                <ListItemText
                  primary={`Start: ${range.start?.format(
                    "YYYY-MM-DD HH:mm",
                  )}, End: ${range.end?.format("YYYY-MM-DD HH:mm")}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSuggestedDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
