import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { EnhancedItem } from "../../types";
import { getAccessToken } from "../../../../auth/utils";
import { BACKEND_URL } from "../../../../query";

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
    const query = getEnhancedItemsQuery(storeId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
