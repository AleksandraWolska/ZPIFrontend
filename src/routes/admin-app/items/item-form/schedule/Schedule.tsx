import { useItemForm } from "../ItemFormProvider";
import Fixed from "./Fixed";
import Slots from "./Slots";
import Continuous from "./Continuous";

function Schedule() {
  const { itemConfig } = useItemForm();
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
