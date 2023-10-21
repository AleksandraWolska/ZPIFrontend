import Fixed from "../../components/schedule/Fixed";
import Slots from "../../components/schedule/Slots";
import Continuous from "../../components/schedule/Continuous";
import { useEditItem } from "../EditItemProvider";

function Schedule() {
  const { itemConfig, enhancedItem, setInitialStatus } = useEditItem();
  const { flexibility, granularity } = itemConfig.core;

  return (
    <>
      {flexibility === false && (
        <Fixed
          enhancedItem={enhancedItem}
          setInitialStatus={setInitialStatus}
        />
      )}
      {flexibility === true && granularity === true && (
        <Slots
          enhancedItem={enhancedItem}
          setInitialStatus={setInitialStatus}
        />
      )}
      {flexibility === true && granularity === false && (
        <Continuous
          enhancedItem={enhancedItem}
          setInitialStatus={setInitialStatus}
        />
      )}
    </>
  );
}

export default Schedule;
