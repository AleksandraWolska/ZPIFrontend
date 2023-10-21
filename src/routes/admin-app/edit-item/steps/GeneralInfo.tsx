import GeneralInfoForm from "../../components/GeneralInfoForm";
import { useEnhancedItem } from "../../enhanced-item-context/EnhancedItemProvider";

function GeneralInfo() {
  const { itemConfig, enhancedItem, setItemAttribute, setInitialStatus } =
    useEnhancedItem();

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
