import { useEditItem } from "../EditItemProvider";
import useEditEnhancedItem from "../useEditEnhancedItem";

function Summary() {
  const { enhancedItem } = useEditItem();
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
