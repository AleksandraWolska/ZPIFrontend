import dayjs from "dayjs";
import { ContinuousSchedule } from "../../../types";

const startOfWeek = dayjs().startOf("week").add(1, "day");

export const schedule: ContinuousSchedule = {
  scheduledRanges: Array.from({
    length: 7,
  }).flatMap((_, i) => {
    const currentDay = startOfWeek.add(i, "day");

    const morningEvent = {
      startDateTime: currentDay.add(8, "hour").toDate().toISOString(),
      endDateTime: currentDay.add(12, "hour").toDate().toISOString(),
    };

    const afternoonEvent = {
      startDateTime: currentDay.add(14, "hour").toDate().toISOString(),
      endDateTime: currentDay.add(18, "hour").toDate().toISOString(),
    };

    return [morningEvent, afternoonEvent];
  }),
};
