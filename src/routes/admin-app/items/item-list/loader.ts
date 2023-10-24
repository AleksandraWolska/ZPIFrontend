import { QueryClient } from "react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";
import { EnhancedItem } from "../../types";
import { getAccessToken } from "../../../../auth/utils";
import { BACKEND_URL } from "../../../../query";
import { getItemConfigQuery } from "../common-data/itemConfigQuery";

const fetchEnhancedItems = async (storeId: string): Promise<EnhancedItem[]> => {
  const token = getAccessToken();

  const res = await fetch(
    `${BACKEND_URL}/api/admin/${storeId}/enhanced-items`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
};

export const getEnhancedItemsQuery = (storeId: string) => ({
  queryKey: ["enhanced-items", storeId],
  queryFn: () => fetchEnhancedItems(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as {
      storeId: string;
    };

    const enhancedItemsQuery = getEnhancedItemsQuery(storeId);
    const enhancedItems = new Promise((resolve) => {
      resolve(
        queryClient.getQueryData(enhancedItemsQuery.queryKey) ??
          queryClient.fetchQuery(enhancedItemsQuery),
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
      enhancedItems: await enhancedItems,
      itemConfig: await itemConfig,
    });
  };
