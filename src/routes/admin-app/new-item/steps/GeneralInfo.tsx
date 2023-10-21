import { useNewItem } from "../NewItemProvider";
import GeneralInfoForm from "../../components/GeneralInfoForm";

function GeneralInfo() {
  const { itemConfig, enhancedItem, setItemAttribute, setInitialStatus } =
    useNewItem();

  return (
    <GeneralInfoForm
      enhancedItem={enhancedItem}
      setItemAttribute={setItemAttribute}
      setInitialStatus={setInitialStatus}
      core={itemConfig.core}
    />
  );
}

export default GeneralInfo;
