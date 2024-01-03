import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { BACKEND_URL, queryClient } from "../../../../query";
import { Item, SubItem } from "../../../../types";
import { getAccessToken } from "../../../../auth/utils";

export type ItemWithoutSubItemsId = Omit<Item, "subItems"> & {
  subItems?: Omit<SubItem, "id">[];
};

export const removeIdsFromSubItems = (item: Item): ItemWithoutSubItemsId => {
  const { subItems } = item;

  const subItemsWithoutId = subItems?.map((si): Omit<SubItem, "id"> => {
    const { id, ...rest } = si;

    return {
      ...rest,
    };
  });

  return {
    ...item,
    ...(subItemsWithoutId !== undefined && {
      subItems: subItemsWithoutId,
    }),
  };
};

const editItem = async (item: ItemWithoutSubItemsId, storeId: string) => {
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

  if (!res.ok) {
    throw new Response(res.body, { status: res.status });
  }

  return res.json();
};

function useEditItem() {
  const { storeId } = useParams() as { storeId: string };

  return useMutation({
    mutationFn: (item: ItemWithoutSubItemsId) => {
      return editItem(item, storeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["items", storeId]);
    },
  });
}

export default useEditItem;
