import React, { useEffect } from "react";
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

interface CheckAvailabilityDatepickerProps {
  id: number;
  userCount: number;
  onAvailabilityChecked: (id: number, start: string, end: string) => void;
}

export function CheckAvailabilityDatepicker({
  id,
  userCount,
  onAvailabilityChecked,
}: CheckAvailabilityDatepickerProps) {
  const [startDateTime, setStartDateTime] = React.useState<dayjs.Dayjs | null>(
    null,
  );
  const [endDateTime, setEndDateTime] = React.useState<dayjs.Dayjs | null>(
    null,
  );
  const [availabilityChecked, setAvailabilityChecked] = React.useState(false);
  const [showSuggestedDialog, setShowSuggestedDialog] = React.useState(false);

  const handleDateTimeChange = () => {
    setAvailabilityChecked(false);
  };
  useEffect(() => {
    handleDateTimeChange();
  }, [userCount]);

  const suggestedDateRanges = [
    { id: 1, startOffset: 0.5, endOffset: 0.5 },
    { id: 2, startOffset: 1, endOffset: 1 },
    { id: 3, startOffset: 2, endOffset: 2 },
  ].map((range) => ({
    start: startDateTime?.add(range.startOffset, "hour") || null,
    end: endDateTime?.add(range.endOffset, "hour") || null,
  }));

  const handleSuggestedDateClick = (index: number) => {
    const suggestedDate = suggestedDateRanges[index];
    setStartDateTime(suggestedDate.start);
    setEndDateTime(suggestedDate.end);
    setShowSuggestedDialog(false);
    setAvailabilityChecked(true);
  };
  const handleCheckAvailability = () => {
    // TODO SEND REQUEST WIH
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

      {/* <Dialog
        open={reservationSuccess}
        onClose={() => setReservationSuccess(false)}
      >
        <DialogTitle>Successful reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Start Date and Time: {startDateTime?.format("YYYY-MM-DD HH:mm")}{" "}
            <br />
            End Date and Time: {endDateTime?.format("YYYY-MM-DD HH:mm")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetStates} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog> */}

      <Dialog
        open={showSuggestedDialog}
        onClose={() => setShowSuggestedDialog(false)}
      >
        <DialogTitle>Suggested Times</DialogTitle>
        <DialogContent>
          <List>
            {suggestedDateRanges.map((range, index) => (
              <ListItem
                button
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                onClick={() => handleSuggestedDateClick(index)}
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
