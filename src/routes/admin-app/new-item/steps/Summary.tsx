import useAddEnhancedItem from "../useAddEnhancedItem";
import { useEnhancedItem } from "../../enhanced-item-context/EnhancedItemProvider";

function Summary() {
  const { enhancedItem } = useEnhancedItem();
  const addEnhancedItem = useAddEnhancedItem();

  return (
    <>
      <div>{JSON.stringify(enhancedItem)}</div>
      <button
        type="button"
        onClick={() => {
          addEnhancedItem.mutate(enhancedItem);
        }}
      >
        ADD ITEM
      </button>
    </>
  );
}

export default Summary;
