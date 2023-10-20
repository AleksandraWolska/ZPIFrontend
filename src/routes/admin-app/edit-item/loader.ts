import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { Item } from "../../../types";

const fetchItem = async (storeId: string, itemId: string): Promise<Item> => {
  const res = await fetch(`/api/admin/${storeId}/items/${itemId}`);
  return res.json();
};

export const getItemQuery = (storeId: string, itemId: string) => ({
  queryKey: ["items", storeId, itemId],
  queryFn: () => fetchItem(storeId, itemId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId, itemId } = params as { storeId: string; itemId: string };
    const query = getItemQuery(storeId, itemId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
