import {
  Availability,
  ContinuousSchedule,
  SlotsSchedule,
} from "../../../types";

// in the future this should contain more complex logic to calculate availability based on reservation requests
export const calculateAvailability = (
  schedule: SlotsSchedule | ContinuousSchedule,
): Availability[] => {
  if ("scheduledSlots" in schedule) {
    return schedule.scheduledSlots.map((slot) => ({
      startDateTime: slot.startDateTime,
      endDateTime: slot.endDateTime,
      type: "slot",
    }));
  }

  return schedule.scheduledRanges.map((range) => ({
    startDateTime: range.startDateTime,
    endDateTime: range.endDateTime,
    type: "continuous",
  }));
};
