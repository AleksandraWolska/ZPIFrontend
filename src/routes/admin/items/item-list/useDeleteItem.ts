import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { BACKEND_URL, queryClient } from "../../../../query";
import { getAccessToken } from "../../../../auth/utils";

const deleteItem = (storeId: string, itemId: string) => {
  const token = getAccessToken();

  return fetch(`${BACKEND_URL}/stores/${storeId}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

function useDeleteItem() {
  const { storeId } = useParams() as { storeId: string };

  return useMutation({
    mutationFn: (itemId: string) => {
      return deleteItem(storeId, itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["items", storeId]);
    },
  });
}

export default useDeleteItem;
