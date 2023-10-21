import CustomAttributesForm from "../../components/CustomAttributesForm";
import { useEnhancedItem } from "../../enhanced-item-context/EnhancedItemProvider";

function CustomAttributes() {
  const { itemConfig, enhancedItem, setItemCustomAttribute } =
    useEnhancedItem();

  return (
    <CustomAttributesForm
      enhancedItem={enhancedItem}
      setItemCustomAttribute={setItemCustomAttribute}
      customAttributesSpec={itemConfig.customAttributesSpec}
    />
  );
}

export default CustomAttributes;
