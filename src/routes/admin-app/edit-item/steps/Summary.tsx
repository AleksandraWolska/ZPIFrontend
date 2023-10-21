import useEditEnhancedItem from "../useEditEnhancedItem";
import { useEnhancedItem } from "../../enhanced-item-context/EnhancedItemProvider";

function Summary() {
  const { enhancedItem } = useEnhancedItem();
  const editEnhancedItem = useEditEnhancedItem();

  return (
    <>
      <div>{JSON.stringify(enhancedItem)}</div>
      <button
        type="button"
        onClick={() => {
          editEnhancedItem.mutate(enhancedItem);
        }}
      >
        EDIT ITEM
      </button>
    </>
  );
}

export default Summary;
