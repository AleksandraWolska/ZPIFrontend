import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { BACKEND_URL, queryClient } from "../../../../query";
import { Item, SubItem } from "../../../../types";
import { ItemWithoutIds } from "../../types";
import { getAccessToken } from "../../../../auth/utils";

export const removeIdsFromItem = (item: Item): ItemWithoutIds => {
  const { subItems } = item;

  const subItemsWithoutId = subItems?.map((si): Omit<SubItem, "id"> => {
    const { id, ...rest } = si;

    return {
      ...rest,
    };
  });

  const { id, ...rest } = item;

  return {
    ...rest,
    ...(subItemsWithoutId !== undefined && {
      subItems: subItemsWithoutId,
    }),
  };
};

const addItem = (item: ItemWithoutIds, storeId: string) => {
  const token = getAccessToken();

  return fetch(
    `${
      process.env.NODE_ENV === "development"
        ? `/api/admin/items`
        : `${BACKEND_URL}/stores/${storeId}/items`
    }`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    },
  );
};

function useAddItem() {
  const params = useParams() as { storeId: string };
  return useMutation({
    mutationFn: (item: ItemWithoutIds) => {
      return addItem(item, params.storeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-items"]);
    },
  });
}

export default useAddItem;
