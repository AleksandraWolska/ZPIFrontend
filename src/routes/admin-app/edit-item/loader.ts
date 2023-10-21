import { QueryClient } from "react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";
import { EnhancedItem, ItemConfig } from "../types";

const fetchEnhancedItem = async (
  storeId: string,
  itemId: string,
): Promise<EnhancedItem> => {
  const res = await fetch(`/api/admin/${storeId}/enhanced-items/${itemId}`);
  return res.json();
};

export const getEnhancedItemQuery = (storeId: string, itemId: string) => ({
  queryKey: ["enhanced-items", storeId, itemId],
  queryFn: () => fetchEnhancedItem(storeId, itemId),
});

const fetchItemConfig = async (storeId: string): Promise<ItemConfig> => {
  const res = await fetch(`/api/stores/${storeId}/item-config`);
  return res.json();
};

export const getItemConfigQuery = (storeId: string) => ({
  queryKey: ["item-config", storeId],
  queryFn: () => fetchItemConfig(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId, itemId } = params as { storeId: string; itemId: string };

    const enhancedItemQuery = getEnhancedItemQuery(storeId, itemId);
    const enhancedItem = new Promise((resolve) => {
      resolve(
        queryClient.getQueryData(enhancedItemQuery.queryKey) ??
          queryClient.fetchQuery(enhancedItemQuery),
      );
    });

    const itemConfigQuery = getItemConfigQuery(storeId);
    const itemConfig = new Promise((resolve) => {
      resolve(
        queryClient.getQueryData(itemConfigQuery.queryKey) ??
          queryClient.fetchQuery(itemConfigQuery),
      );
    });

    return defer({
      enhancedItem: await enhancedItem,
      itemConfig: await itemConfig,
    });
  };
