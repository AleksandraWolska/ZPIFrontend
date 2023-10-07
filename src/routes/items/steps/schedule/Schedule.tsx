import SpecificScheduleCalendar, {
  defaultSpecificSchedule,
} from "./SpecificScheduleCalendar";
import {
  ScheduleMode,
  NewItemOptions,
  SpecificSchedule,
  WeeklySchedule,
} from "../../types";
import WeeklyScheduleCalendar, {
  defaultWeeklySchedule,
} from "./WeeklyScheduleCalendar";

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
  const scheduleMode: ScheduleMode = "weekly"; // TODO: Should be computed based on core

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
        <WeeklyScheduleCalendar
          weeklySchedule={
            !newItemSchedule || typeof newItemSchedule === "string"
              ? defaultWeeklySchedule
              : (newItemSchedule as WeeklySchedule)
          }
          setSchedule={(schedule: WeeklySchedule) =>
            setItemOption({ schedule })
          }
        />
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

export default Schedule;
