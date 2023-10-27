import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../../../../query";
import { Item, SubItem } from "../../../../types";

export type ItemWithoutId = Omit<Item, "id" | "subItems"> & {
  subItems?: Omit<SubItem, "id">[];
};

export const removeIdsFromItem = (item: Item): ItemWithoutId => {
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

const addItem = (storeId: string, item: ItemWithoutId) => {
  return fetch(`/api/stores/${storeId}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

function useAddItem() {
  const params = useParams() as { storeId: string };

  return useMutation({
    mutationFn: (item: ItemWithoutId) => {
      return addItem(params.storeId, item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["items", params.storeId]);
    },
  });
}

export default useAddItem;
