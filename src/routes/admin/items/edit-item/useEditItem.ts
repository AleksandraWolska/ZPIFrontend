import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { BACKEND_URL, queryClient } from "../../../../query";
import { Item } from "../../../../types";
import { getAccessToken } from "../../../../auth/utils";

const editItem = async (item: Item, storeId: string) => {
  console.log("aaa");
  const token = getAccessToken();

  const res = await fetch(`${BACKEND_URL}/stores/${storeId}/items/${item.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  console.log("res", res);
  if (!res.ok) {
    throw new Response(res.body, { status: res.status });
  }

  return res.json();
};

function useEditItem() {
  const { storeId } = useParams() as { storeId: string };

  return useMutation({
    mutationFn: (item: Item) => {
      return editItem(item, storeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["items", storeId]);
    },
  });
}

export default useEditItem;
