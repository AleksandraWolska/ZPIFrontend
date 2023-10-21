import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../../../query";
import { EnhancedItem } from "../types";

const addItem = (storeId: string, enhancedItem: EnhancedItem) => {
  return fetch(`/api/stores/${storeId}/enhanced-items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enhancedItem),
  });
};

function useAddItem() {
  const params = useParams() as { storeId: string };

  return useMutation({
    mutationFn: (enhancedItem: EnhancedItem) => {
      return addItem(params.storeId, enhancedItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["enhanced-items", params.storeId]);
    },
  });
}

export default useAddItem;
