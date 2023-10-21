import SubItemsForm from "../../components/SubItemsForm";
import { useEnhancedItem } from "../../enhanced-item-context/EnhancedItemProvider";

function SubItems() {
  const { enhancedItem, setItemAttribute } = useEnhancedItem();

  return (
    <SubItemsForm
      enhancedItem={enhancedItem}
      setItemAttribute={setItemAttribute}
    />
  );
}

export default SubItems;
