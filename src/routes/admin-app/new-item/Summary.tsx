import useAddItem from "./useAddItem";
import { useEnhancedItem } from "../enhanced-item-context/EnhancedItemProvider";

function Summary() {
  const { enhancedItem } = useEnhancedItem();
  const addItem = useAddItem();

  return (
    <>
      <div>{JSON.stringify(enhancedItem)}</div>
      <button
        type="button"
        onClick={() => {
          addItem.mutate(enhancedItem);
        }}
      >
        ADD ITEM
      </button>
    </>
  );
}

export default Summary;
