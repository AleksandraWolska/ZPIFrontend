import { useNewItem } from "../NewItemProvider";
import CustomAttributesForm from "../../components/CustomAttributesForm";

function CustomAttributes() {
  const { itemConfig, enhancedItem, setItemCustomAttribute } = useNewItem();

  return (
    <CustomAttributesForm
      enhancedItem={enhancedItem}
      setItemCustomAttribute={setItemCustomAttribute}
      customAttributesSpec={itemConfig.customAttributesSpec}
    />
  );
}

export default CustomAttributes;
