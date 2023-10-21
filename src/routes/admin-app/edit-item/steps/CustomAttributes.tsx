import CustomAttributesForm from "../../components/CustomAttributesForm";
import { useEditItem } from "../EditItemProvider";

function CustomAttributes() {
  const { itemConfig, enhancedItem, setItemCustomAttribute } = useEditItem();

  return (
    <CustomAttributesForm
      enhancedItem={enhancedItem}
      setItemCustomAttribute={setItemCustomAttribute}
      customAttributesSpec={itemConfig.customAttributesSpec}
    />
  );
}

export default CustomAttributes;
