import dayjs from "dayjs";
import { Availability } from "../../../types";

const today = dayjs();
const startOfWeek = today.startOf("week").add(1, "day"); // Moves to Monday

export const availability: Availability[] = Array.from({
  length: 7,
}).flatMap((_, i) => {
  const currentDay = startOfWeek.add(i, "day"); // Calculates the day for the current iteration

  const morningEvent: Availability = {
    startDateTime: currentDay.add(8, "hour").toDate().toISOString(),
    endDateTime: currentDay.add(12, "hour").toDate().toISOString(),
    type: "morning",
  };

  const afternoonEvent: Availability = {
    startDateTime: currentDay.add(14, "hour").toDate().toISOString(),
    endDateTime: currentDay.add(18, "hour").toDate().toISOString(),
    type: "afternoon",
  };

  return [morningEvent, afternoonEvent];
});
