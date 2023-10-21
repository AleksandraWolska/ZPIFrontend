import { useEnhancedItem } from "../../enhanced-item-context/EnhancedItemProvider";
import Fixed from "./Fixed";
import Slots from "./Slots";
import Continuous from "./Continuous";

function Schedule() {
  const { itemConfig, enhancedItem, setInitialStatus } = useEnhancedItem();
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
