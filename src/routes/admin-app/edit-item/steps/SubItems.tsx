import SubItemsForm from "../../components/SubItemsForm";
import { useEditItem } from "../EditItemProvider";

function SubItems() {
  const { enhancedItem, setItemAttribute } = useEditItem();

  return (
    <SubItemsForm
      enhancedItem={enhancedItem}
      setItemAttribute={setItemAttribute}
    />
  );
}

export default SubItems;
