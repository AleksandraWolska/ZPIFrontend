import dayjs from "dayjs";
import { Availability, SpecificAvailability } from "../../../../../types";

const today = dayjs();
const startOfWeek = today.startOf("week").add(1, "day"); // Moves to Monday

export const dummyAvailability: Availability = Array.from({
  length: 7,
}).flatMap((_, i) => {
  const currentDay = startOfWeek.add(i, "day"); // Calculates the day for the current iteration

  const morningEvent: SpecificAvailability = {
    startDateTime: currentDay.add(8, "hour").toDate().toISOString(),
    endDateTime: currentDay.add(12, "hour").toDate().toISOString(),
  };

  const afternoonEvent: SpecificAvailability = {
    startDateTime: currentDay.add(14, "hour").toDate().toISOString(),
    endDateTime: currentDay.add(18, "hour").toDate().toISOString(),
  };

  return [morningEvent, afternoonEvent];
});
