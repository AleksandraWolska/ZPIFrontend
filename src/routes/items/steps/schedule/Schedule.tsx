import ShortSlots from "./short-slots/ShortSlots";
import MultiDay from "./MultiDay";
import Fixed from "./Fixed";
import Free from "./Free";
import { useNewItemSchemaConfig } from "../../NewItemSchemaProvider";

function Schedule() {
  const { newItemConfig } = useNewItemSchemaConfig();
  const { scheduleType } = newItemConfig.core;

  return (
    <>
      {scheduleType === "fixed" && <Fixed />}
      {scheduleType === "shortSlots" && <ShortSlots />}
      {scheduleType === "multiDay" && <MultiDay />}
      {scheduleType === "free" && <Free />}
    </>
  );
}

export default Schedule;
