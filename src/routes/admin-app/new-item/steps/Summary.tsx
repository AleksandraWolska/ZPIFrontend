import { useNewItem } from "../NewItemProvider";
import useAddEnhancedItem from "../useAddEnhancedItem";

function Summary() {
  const { enhancedItem } = useNewItem();
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
