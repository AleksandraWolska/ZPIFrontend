import Slots from "./Slots";
import Continuous from "./Continuous";
import Fixed from "./Fixed";
import { useNewItemSchemaConfig } from "../../NewItemSchemaProvider";

function Schedule() {
  const { newItemConfig } = useNewItemSchemaConfig();
  const { flexibility, granularity } = newItemConfig.core;

  return (
    <>
      {flexibility === false && <Fixed />}
      {granularity === true && <Slots />}
      {granularity === false && <Continuous />}
    </>
  );
}

export default Schedule;
