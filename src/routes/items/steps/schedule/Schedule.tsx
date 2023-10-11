import ShortSlots from "./short-slots/ShortSlots";
import MultiDay from "./MultiDay";
import Fixed from "./Fixed";
import { useNewItemSchemaConfig } from "../../NewItemSchemaProvider";

function Schedule() {
  const { newItemConfig } = useNewItemSchemaConfig();
  const { flexibility, scheduleType } = newItemConfig.core;

  return (
    <>
      {flexibility === false && <Fixed />}
      {scheduleType === "shortSlots" && <ShortSlots />}
      {scheduleType === "multiDay" && <MultiDay />}
    </>
  );
}

export default Schedule;
