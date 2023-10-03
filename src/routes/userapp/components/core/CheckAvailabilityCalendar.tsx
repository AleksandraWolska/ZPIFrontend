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
} from "@mui/material";

const dayjsLoc = dayjsLocalizer(dayjs);

type Event = {
  id: string;
  start: Date;
  end: Date;
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
  onAvailabilityChecked: (idx: string, start: string, end: string) => void;
  availabilityChecked: boolean;
  setAvailabilityChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CheckAvailabilityCalendar({
  itemId,
  userCount,
  onAvailabilityChecked,
  availabilityChecked,
  setAvailabilityChecked,
}: CheckAvailabilityCalendarProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [showSuggestedDialog, setShowSuggestedDialog] = useState(false);

  useEffect(() => {
    console.log("OPEN HOURS:", events);
  }, [events]);

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
      setEvents(() => [{ id: uuid(), start, end }]);
      setAvailabilityChecked(false);
    },
    [setEvents, setAvailabilityChecked],
  );
  const handleSelecting = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      console.log("selecting");
      const conflicted = events.some((e) => {
        return (
          (start > e.start && start < e.end) || (end > e.start && end < e.end)
        );
      });
      console.log(conflicted);
      return !conflicted;
    },
    [events],
  );

  const handleSelectEvent = useCallback(
    (event: Event) => {
      console.log("select event");
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
    },
    [setEvents],
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
      <Box style={{ width: "400px", height: "400px" }}>
        Halooo
        <BigCalendar
          localizer={dayjsLoc}
          view={Views.WEEK}
          formats={baseFormats}
          components={{}}
          selectable
          events={events}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onSelecting={handleSelecting}
          style={{ height: "400px" }}
        />
      </Box>
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
