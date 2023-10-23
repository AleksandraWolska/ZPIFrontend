import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../../../../query";
import { EnhancedItem, EnhancedSubItem } from "../../types";
import { Item, SubItem } from "../../../../types";

type SubItemWithoutId = Omit<SubItem, "id">;
type EnhancedSubItemWithoutId = Omit<EnhancedSubItem, "subItem"> & {
  subItem: SubItemWithoutId;
};

type ItemWithoutId = Omit<Item, "id">;
export type EnhancedItemWithoutIds = Omit<EnhancedItem, "item"> & {
  item: Omit<ItemWithoutId, "subItemList"> & {
    subItemList?: EnhancedSubItemWithoutId[];
  };
};

export const removeIdsFromEnhancedItem = (
  enhancedItem: EnhancedItem,
): EnhancedItemWithoutIds => {
  const { item } = enhancedItem;
  const { subItemList } = item;

  const subItemListWithoutIds = subItemList?.map((enhancedSubItem) => {
    const { subItem } = enhancedSubItem;
    const { id, ...rest } = subItem;

    return {
      ...enhancedSubItem,
      subItem: rest,
    };
  });

  const { id, ...rest } = item;

  return {
    ...enhancedItem,
    item: {
      ...rest,
      ...(subItemListWithoutIds !== undefined && {
        subItemList: subItemListWithoutIds,
      }),
    },
  };
};

const addItem = (storeId: string, enhancedItem: EnhancedItemWithoutIds) => {
  return fetch(`/api/stores/${storeId}/enhanced-items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enhancedItem),
  });
};

function useAddItem() {
  const params = useParams() as { storeId: string };

  return useMutation({
    mutationFn: (enhancedItem: EnhancedItemWithoutIds) => {
      return addItem(params.storeId, enhancedItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["enhanced-items", params.storeId]);
    },
  });
}

export default useAddItem;
