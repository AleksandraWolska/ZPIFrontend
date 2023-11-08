import dayjs from "dayjs";
import { ContinuousSchedule } from "../../../types";

const startOfWeek = dayjs().startOf("week").add(1, "day");
const currentMinutes = dayjs().minute();

export const schedule: ContinuousSchedule = {
  scheduledRanges: Array.from({
    length: 7,
  }).flatMap((_, i) => {
    const currentDay = startOfWeek.add(i, "day");

    const morningEvent = {
      startDateTime: currentDay
        .add(8, "hour")
        .add(Math.ceil(Math.random() * 50), "minute")
        .toDate()
        .toISOString(),
      endDateTime: currentDay
        .add(12, "hour")
        .add(currentMinutes, "minute")
        .toDate()
        .toISOString(),
    };

    const afternoonEvent = {
      startDateTime: currentDay
        .add(14, "hour")
        .add(currentMinutes, "minute")
        .toDate()
        .toISOString(),
      endDateTime: currentDay
        .add(19, "hour")
        .add(currentMinutes, "minute")
        .toDate()
        .toISOString(),
    };

    return [morningEvent, afternoonEvent];
  }),
};
