import { useMutation } from "react-query";
import { queryClient } from "../../../../query";
import { getAccessToken } from "../../../../auth/utils";

const deleteItem = (itemId: string) => {
  const token = getAccessToken();

  return fetch(`/api/admin/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

function useDeleteItem() {
  return useMutation({
    mutationFn: (itemId: string) => {
      return deleteItem(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-items"]);
    },
  });
}

export default useDeleteItem;
