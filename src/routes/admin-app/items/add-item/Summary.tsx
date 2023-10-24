import { useNavigate } from "react-router-dom";
import useAddItem, { removeIdsFromEnhancedItem } from "./useAddItem";
import { useEnhancedItem } from "../enhanced-item-context/EnhancedItemProvider";

function Summary() {
  const { enhancedItem } = useEnhancedItem();
  const addItem = useAddItem();
  const navigate = useNavigate();

  return (
    <>
      <div>{JSON.stringify(enhancedItem)}</div>
      <button
        type="button"
        onClick={() => {
          addItem.mutate(removeIdsFromEnhancedItem(enhancedItem), {
            onSuccess: () => {
              navigate("../item-list", { relative: "path" });
            },
          });
        }}
      >
        ADD ITEM
      </button>
    </>
  );
}

export default Summary;
