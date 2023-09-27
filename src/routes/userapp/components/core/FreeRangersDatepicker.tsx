import React from "react";
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";

type FreeRangesUserInputProps = {
  id: number;
  userCount: number;
  onAvailabilityChecked: (id: number, start: string, end: string) => void;
};

export function FreeRangesDatepicker({
  id,
  userCount,
  onAvailabilityChecked,
}: FreeRangesUserInputProps) {
  const [startDateTime, setStartDateTime] = React.useState<dayjs.Dayjs | null>(
    null,
  );
  const [endDateTime, setEndDateTime] = React.useState<dayjs.Dayjs | null>(
    null,
  );
  const handleReservation = () => {
    console.log(userCount);
    if (startDateTime && endDateTime) {
      onAvailabilityChecked(
        id,
        startDateTime.toISOString(),
        endDateTime.toISOString(),
      );
    }
  };

  return (
    <>
      <Box margin={3}>
        <DateTimePicker
          value={startDateTime}
          onChange={(date: dayjs.Dayjs | null) => {
            setStartDateTime(date);
          }}
          label="Select Start Date and Time"
        />
      </Box>
      <Box margin={3}>
        <DateTimePicker
          value={endDateTime}
          onChange={(date: dayjs.Dayjs | null) => {
            setEndDateTime(date);
          }}
          label="Select End Date and Time"
        />
      </Box>
      <Box marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          disabled={!startDateTime || !endDateTime}
          onClick={handleReservation}
        >
          Reserve Item
        </Button>
      </Box>
    </>
  );
}
