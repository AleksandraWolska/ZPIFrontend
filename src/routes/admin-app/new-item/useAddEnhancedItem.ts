import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../../../query";
import { EnhancedItem } from "../types";

const addEnhancedItem = (storeId: string, enhancedItem: EnhancedItem) => {
  return fetch(`/api/stores/${storeId}/add-enhanced-item`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enhancedItem),
  });
};

function useAddEnhancedItem() {
  const params = useParams() as { storeId: string };

  return useMutation({
    mutationFn: (enhancedItem: EnhancedItem) => {
      return addEnhancedItem(params.storeId, enhancedItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["enhanced-items", params.storeId]);
    },
  });
}

export default useAddEnhancedItem;
