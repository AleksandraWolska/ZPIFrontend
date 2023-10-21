import Stepper from "./Stepper";
import EnhancedItemProvider from "../enhanced-item-context/EnhancedItemProvider";
import useEnhancedItemToBeEdited from "./useEnhancedItemToBeEdited";

function EditItem() {
  const enhancedItemToBeEdited = useEnhancedItemToBeEdited();

  return (
    <EnhancedItemProvider initialEnhancedItem={enhancedItemToBeEdited}>
      <Stepper />
    </EnhancedItemProvider>
  );
}

export default EditItem;
