import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { queryClient } from "../../../../query";

const deleteItem = (storeId: string, itemId: string) => {
  return fetch(`/api/stores/${storeId}/enhanced-items/${itemId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

function useDeleteItem() {
  const { storeId } = useParams() as {
    storeId: string;
  };

  return useMutation({
    mutationFn: (itemId: string) => {
      return deleteItem(storeId, itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["enhanced-items", storeId]);
    },
  });
}

export default useDeleteItem;
