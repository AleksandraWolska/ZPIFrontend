import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { Item } from "../../../types";
import { getAccessToken } from "../../../auth/utils";
import { BACKEND_URL } from "../../../query";

const fetchItems = async (storeId: string): Promise<Item[]> => {
  const token = getAccessToken();

  const res = await fetch(`${BACKEND_URL}/api/admin/${storeId}/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const getItemsQuery = (storeId: string) => ({
  queryKey: ["items", storeId],
  queryFn: () => fetchItems(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as {
      storeId: string;
    };
    const query = getItemsQuery(storeId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
