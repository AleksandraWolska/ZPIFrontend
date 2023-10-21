import { QueryClient } from "react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";
import { EnhancedItem } from "../types";
import { getItemConfigQuery } from "../common-data/itemConfigQuery";

const fetchItemToBeEdited = async (
  storeId: string,
  itemId: string,
): Promise<EnhancedItem> => {
  const res = await fetch(`/api/admin/${storeId}/enhanced-items/${itemId}`);
  return res.json();
};

export const getItemToBeEditedQuery = (storeId: string, itemId: string) => ({
  queryKey: ["enhanced-items", storeId, itemId],
  queryFn: () => fetchItemToBeEdited(storeId, itemId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId, itemId } = params as { storeId: string; itemId: string };

    const itemToBeEditedQuery = getItemToBeEditedQuery(storeId, itemId);
    const itemToBeEdited = new Promise((resolve) => {
      resolve(
        queryClient.getQueryData(itemToBeEditedQuery.queryKey) ??
          queryClient.fetchQuery(itemToBeEditedQuery),
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
      itemToBeEdited: await itemToBeEdited,
      itemConfig: await itemConfig,
    });
  };
