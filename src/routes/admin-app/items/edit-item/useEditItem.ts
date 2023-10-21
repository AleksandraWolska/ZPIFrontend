import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { EnhancedItem } from "../../types";
import { queryClient } from "../../../../query";

const editItem = (
  storeId: string,
  itemId: string,
  enhancedItem: EnhancedItem,
) => {
  return fetch(`/api/stores/${storeId}/enhanced-items/${itemId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enhancedItem),
  });
};

function useEditItem() {
  const { storeId, itemId } = useParams() as {
    storeId: string;
    itemId: string;
  };

  return useMutation({
    mutationFn: (enhancedItem: EnhancedItem) => {
      return editItem(storeId, itemId, enhancedItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["enhanced-items", storeId]);
    },
  });
}

export default useEditItem;
