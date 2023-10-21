import GeneralInfoForm from "../../components/GeneralInfoForm";
import { useEditItem } from "../EditItemProvider";

function GeneralInfo() {
  const { itemConfig, enhancedItem, setItemAttribute, setInitialStatus } =
    useEditItem();

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
