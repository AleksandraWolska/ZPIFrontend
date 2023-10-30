import Fixed from "./Fixed";
import Slots from "./Slots";
import Continuous from "./Continuous";
import useStoreConfig from "../../../useStoreConfig";

function Schedule() {
  const storeConfig = useStoreConfig();
  const { flexibility, granularity } = storeConfig.core;

  return (
    <>
      {flexibility === false && <Fixed />}
      {flexibility === true && granularity === true && <Slots />}
      {flexibility === true && granularity === false && <Continuous />}
    </>
  );
}

export default Schedule;
