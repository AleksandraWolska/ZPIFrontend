import { useEnhancedItem } from "../enhanced-item-context/EnhancedItemProvider";
import useEditItem from "./useEditItem";

function Summary() {
  const { enhancedItem } = useEnhancedItem();
  const editItem = useEditItem();

  return (
    <>
      <div>{JSON.stringify(enhancedItem)}</div>
      <button
        type="button"
        onClick={() => {
          editItem.mutate(enhancedItem);
        }}
      >
        EDIT ITEM
      </button>
    </>
  );
}

export default Summary;
