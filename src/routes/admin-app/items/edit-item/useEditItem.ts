import { useMutation } from "react-query";
import { queryClient } from "../../../../query";
import { Item } from "../../../../types";
import { getAccessToken } from "../../../../auth/utils";

const editItem = (item: Item) => {
  const token = getAccessToken();

  return fetch(`/api/admin/items/${item.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

function useEditItem() {
  return useMutation({
    mutationFn: (item: Item) => {
      return editItem(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-items"]);
    },
  });
}

export default useEditItem;
