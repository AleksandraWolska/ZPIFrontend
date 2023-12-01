import { LoaderFunctionArgs } from "react-router-dom";
import { QueryClient } from "react-query";
import { getAccessToken } from "../../../../auth/utils";
import { BACKEND_URL } from "../../../../query";
import { Item } from "../../../../types";

const fetchItems = async (storeId: string): Promise<Item[]> => {
  const token = getAccessToken();

  const res = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? `${BACKEND_URL}/stores/${storeId}/items`
        : `${BACKEND_URL}/stores/${storeId}/items/admin`
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.json();
};

export const getItemsQuery = (storeId: string) => ({
  queryKey: ["items", storeId],
  queryFn: () => fetchItems(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as { storeId: string };
    const query = getItemsQuery(storeId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
