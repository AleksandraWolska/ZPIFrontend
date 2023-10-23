import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { EnhancedItem } from "../../types";
import { queryClient } from "../../../../query";

const editItem = (storeId: string, enhancedItem: EnhancedItem) => {
  return fetch(
    `/api/stores/${storeId}/enhanced-items/${enhancedItem.item.id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enhancedItem),
    },
  );
};

function useEditItem() {
  const { storeId } = useParams() as {
    storeId: string;
  };

  return useMutation({
    mutationFn: (enhancedItem: EnhancedItem) => {
      return editItem(storeId, enhancedItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["enhanced-items", storeId]);
    },
  });
}

export default useEditItem;
