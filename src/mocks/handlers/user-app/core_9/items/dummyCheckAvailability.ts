import dayjs from "dayjs";
import { SpecificAvailability } from "../../../../../types";

const today = dayjs();
const startOfWeek = today.startOf("week").add(1, "day"); // Moves to Monday

export const dummyCheckAvailability: SpecificAvailability[] = Array.from({
  length: 7,
}).flatMap((_, i) => {
  const currentDay = startOfWeek.add(i, "day"); // Calculates the day for the current iteration

  const morningEvent: SpecificAvailability = {
    startDateTime: currentDay.add(9, "hour").toDate().toISOString(),
    endDateTime: currentDay.add(11, "hour").toDate().toISOString(),
  };

  const afternoonEvent: SpecificAvailability = {
    startDateTime: currentDay.add(16, "hour").toDate().toISOString(),
    endDateTime: currentDay.add(19, "hour").toDate().toISOString(),
  };

  return [morningEvent, afternoonEvent];
});
