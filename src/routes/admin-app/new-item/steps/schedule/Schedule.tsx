import Slots from "./Slots";
import Continuous from "./Continuous";
import Fixed from "./Fixed";
import { useNewItem } from "../../NewItemProvider";

function Schedule() {
  const { itemConfig } = useNewItem();
  const { flexibility, granularity } = itemConfig.core;

  return (
    <>
      {flexibility === false && <Fixed />}
      {flexibility === true && granularity === true && <Slots />}
      {flexibility === true && granularity === false && <Continuous />}
    </>
  );
}

export default Schedule;
