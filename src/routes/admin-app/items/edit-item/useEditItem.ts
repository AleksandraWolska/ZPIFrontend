import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { queryClient } from "../../../../query";
import { Item } from "../../../../types";

const editItem = (storeId: string, item: Item) => {
  return fetch(`/api/stores/${storeId}/items/${item.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

function useEditItem() {
  const { storeId } = useParams() as {
    storeId: string;
  };

  return useMutation({
    mutationFn: (item: Item) => {
      return editItem(storeId, item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["items", storeId]);
    },
  });
}

export default useEditItem;
