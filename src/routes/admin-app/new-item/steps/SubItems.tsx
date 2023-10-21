import { useNewItem } from "../NewItemProvider";
import SubItemsForm from "../../components/SubItemsForm";

function SubItems() {
  const { enhancedItem, setItemAttribute } = useNewItem();

  return (
    <SubItemsForm
      enhancedItem={enhancedItem}
      setItemAttribute={setItemAttribute}
    />
  );
}

export default SubItems;
