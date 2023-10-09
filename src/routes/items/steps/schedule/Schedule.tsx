import {
  FixedSchedule,
  FreeSchedule,
  MultiDaySchedule,
  NewItemOptions,
  ShortSlotsSchedule,
} from "../../types";
import ShortSlots from "./ShortSlots";
import MultiDay from "./MultiDay";
import Fixed from "./Fixed";
import Free from "./Free";
import { ScheduleType } from "../../../../types";

function Schedule({
  newItemSchedule,
  setItemOption,
  scheduleType,
}: {
  newItemSchedule: NewItemOptions["schedule"];
  setItemOption: (option: Partial<NewItemOptions>) => void;
  scheduleType: ScheduleType;
}) {
  return (
    <>
      {scheduleType === "fixed" && (
        <Fixed
          newItemSchedule={newItemSchedule as FixedSchedule}
          setItemOption={setItemOption}
        />
      )}
      {scheduleType === "shortSlots" && (
        <ShortSlots
          newItemSchedule={newItemSchedule as ShortSlotsSchedule}
          setItemOption={setItemOption}
        />
      )}
      {scheduleType === "multiDay" && (
        <MultiDay
          newItemSchedule={newItemSchedule as MultiDaySchedule}
          setItemOption={setItemOption}
        />
      )}
      {scheduleType === "free" && (
        <Free
          newItemSchedule={newItemSchedule as FreeSchedule}
          setItemOption={setItemOption}
        />
      )}
    </>
  );
}

export default Schedule;
