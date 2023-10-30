import { useMutation } from "react-query";
import { queryClient } from "../../../../query";
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

const addItem = (item: ItemWithoutIds) => {
  const token = getAccessToken();

  return fetch(`/api/admin/items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

function useAddItem() {
  return useMutation({
    mutationFn: (item: ItemWithoutIds) => {
      return addItem(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-items"]);
    },
  });
}

export default useAddItem;
