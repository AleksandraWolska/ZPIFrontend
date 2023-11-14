import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { BACKEND_URL, queryClient } from "../../../../query";
import { Item } from "../../../../types";
import { getAccessToken } from "../../../../auth/utils";

const editItem = (item: Item, storeId: string) => {
  const token = getAccessToken();

  return fetch(
    `${
      process.env.NODE_ENV === "development"
        ? `/api/admin/items/${item.id}`
        : `${BACKEND_URL}/stores/${storeId}/items`
    }`,
    {
      method: `${process.env.NODE_ENV === "development" ? `PUT` : `POST`}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    },
  );
};

function useEditItem() {
  const params = useParams() as { storeId: string };
  return useMutation({
    mutationFn: (item: Item) => {
      return editItem(item, params.storeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-items"]);
    },
  });
}

export default useEditItem;
