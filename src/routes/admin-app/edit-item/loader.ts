import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { EnhancedItem } from "../types";

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

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId, itemId } = params as { storeId: string; itemId: string };
    const query = getEnhancedItemQuery(storeId, itemId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
