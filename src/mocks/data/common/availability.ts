import { Availability, FlexibleSchedule } from "../../../types";

// in the future this should contain more complex logic to calculate availability based on reservation requests
export const calculateAvailability = (
  schedule: FlexibleSchedule,
): Availability[] => {
  return schedule.scheduledRanges.map((range) => ({
    startDateTime: range.startDateTime,
    endDateTime: range.endDateTime,
    type: "continuous",
  }));
};
