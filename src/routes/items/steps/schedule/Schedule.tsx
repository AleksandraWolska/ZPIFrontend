import SpecificScheduleCalendar from "./SpecificScheduleCalendar";
import { ScheduleMode, NewItemOptions, SpecificSchedule } from "../../types";

const defaultSpecificSchedule: SpecificSchedule = {
  available: [],
  options: {
    granularity: 0,
  },
};

// const defaultWeeklySchedule: WeeklySchedule = {
//   available: [],
//   options: {
//     granularity: 0,
//     startDay: dayjs().toString(),
//     endDay: dayjs().add(7, "day").toString(),
//   },
// };

function Schedule({
  newItemSchedule,
  setItemOption,
  goNext,
  goPrev,
}: {
  newItemSchedule: NewItemOptions["schedule"];
  setItemOption: (option: Partial<NewItemOptions>) => void;
  goNext: () => void;
  goPrev: () => void;
}) {
  const scheduleMode: ScheduleMode = "specific"; // TODO: Should be computed based on core

  return (
    <>
      {scheduleMode === "specific" ? (
        <SpecificScheduleCalendar
          specificSchedule={
            !newItemSchedule || typeof newItemSchedule === "string"
              ? defaultSpecificSchedule
              : (newItemSchedule as SpecificSchedule)
          }
          setSchedule={(schedule: SpecificSchedule) =>
            setItemOption({ schedule })
          }
        />
      ) : (
        "weekly"
      )}

      <button
        type="button"
        onClick={() => {
          goPrev();
        }}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => {
          goNext();
        }}
      >
        Next
      </button>
    </>
  );
}

// function parseEventsToWeekDaySchedule(events: Event[]): WeekDaysSchedule {
//   const initialSchedule: WeekDaysSchedule = {
//     sunday: [],
//     monday: [],
//     tuesday: [],
//     wednesday: [],
//     thursday: [],
//     friday: [],
//     saturday: [],
//   };
//
//   return events.reduce((acc, event) => {
//     const day = event.start.getDay();
//     const dayName = getDayName(day);
//     const newDaySchedule: DailyAvailability[] = [
//       ...acc[dayName],
//       { startTime: event.start.toString(), endTime: event.end.toString() },
//     ];
//     return { ...acc, [dayName]: newDaySchedule };
//   }, initialSchedule);
// }
//
// function getDayName(day: number): keyof WeekDaysSchedule {
//   switch (day) {
//     case 0:
//       return "sunday";
//     case 1:
//       return "monday";
//     case 2:
//       return "tuesday";
//     case 3:
//       return "wednesday";
//     case 4:
//       return "thursday";
//     case 5:
//       return "friday";
//     case 6:
//       return "saturday";
//     default:
//       throw new Error("Invalid day");
//   }
// }

export default Schedule;
