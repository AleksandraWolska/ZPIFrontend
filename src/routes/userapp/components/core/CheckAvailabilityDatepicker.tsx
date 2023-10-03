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
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";

type CheckAvailabilityDatepickerProps = {
  id: string;
  userCount: number;
  onAvailabilityChecked: (idx: string, start: string, end: string) => void;
  availabilityChecked: boolean;
  setAvailabilityChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CheckAvailabilityDatepicker({
  id,
  userCount,
  onAvailabilityChecked,
  availabilityChecked,
  setAvailabilityChecked,
}: CheckAvailabilityDatepickerProps) {
  const [startDateTime, setStartDateTime] = useState<dayjs.Dayjs | null>(null);
  const [endDateTime, setEndDateTime] = useState<dayjs.Dayjs | null>(null);
  const [showSuggestedDialog, setShowSuggestedDialog] = useState(false);

  const suggestedDateRanges = [
    { idx: "1", startOffset: 0.5, endOffset: 0.5 },
    { idx: "2", startOffset: 1, endOffset: 1 },
    { idx: "3", startOffset: 2, endOffset: 2 },
  ].map((range) => ({
    idx: range.idx,
    start: startDateTime?.add(range.startOffset, "hour") || null,
    end: endDateTime?.add(range.endOffset, "hour") || null,
  }));

  const handleSuggestedDateClick = (idx: string) => {
    const suggestedDate = suggestedDateRanges.find(
      (range) => range.idx === idx,
    );

    if (!suggestedDate) return;
    setStartDateTime(suggestedDate.start);
    setEndDateTime(suggestedDate.end);
    setShowSuggestedDialog(false);
    setAvailabilityChecked(true);
  };

  const handleDateTimeChange = () => {
    setAvailabilityChecked(false);
  };

  const handleCheckAvailability = () => {
    console.log(userCount);
    setShowSuggestedDialog(true);
  };

  const buttons = (
    <Box>
      {" "}
      <Box marginTop={2}>
        {!availabilityChecked && (
          <Button
            variant="contained"
            color="primary"
            disabled={!startDateTime || !endDateTime}
            onClick={() => handleCheckAvailability()}
          >
            Check Availability
          </Button>
        )}
        {availabilityChecked && startDateTime && endDateTime && (
          <Button
            variant="contained"
            color="primary"
            disabled={!startDateTime || !endDateTime}
            onClick={() =>
              onAvailabilityChecked(
                id,
                startDateTime.toISOString(),
                endDateTime.toISOString(),
              )
            }
          >
            Reserve Item
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <Box margin={3}>
        <DateTimePicker
          value={startDateTime}
          onChange={(date: dayjs.Dayjs | null) => {
            setStartDateTime(date);
            handleDateTimeChange();
          }}
          label="Select Start Date and Time"
        />
      </Box>
      <Box margin={3}>
        <DateTimePicker
          value={endDateTime}
          onChange={(date: dayjs.Dayjs | null) => {
            setEndDateTime(date);
            handleDateTimeChange();
          }}
          label="Select End Date and Time"
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
                key={id}
                onClick={() => handleSuggestedDateClick(id)}
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
