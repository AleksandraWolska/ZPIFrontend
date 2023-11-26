import { QueryClient } from "react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";
import { Item } from "../../../types";
import { getAccessToken } from "../../../auth/utils";
import { BACKEND_URL } from "../../../query";

const fetchItems = async (storeId: string): Promise<Item[]> => {
  const token = getAccessToken();
  const res = await fetch(`${BACKEND_URL}/stores/${storeId}/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getItemsQuery = (storeId: string) => ({
  queryKey: ["items", storeId],
  queryFn: async () => fetchItems(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as { storeId: string };

    const itemsQuery = getItemsQuery(storeId);
    const items = new Promise((resolve) => {
      resolve(
        queryClient.getQueryData(itemsQuery.queryKey) ??
          queryClient.fetchQuery(itemsQuery),
      );
    });

    return defer({ items: await items });
  };
