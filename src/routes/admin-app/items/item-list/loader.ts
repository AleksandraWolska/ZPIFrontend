import { QueryClient } from "react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";
import { getAccessToken } from "../../../../auth/utils";
import { BACKEND_URL } from "../../../../query";
import { getItemConfigQuery } from "../common-data/itemConfigQuery";
import { Item } from "../../../../types";

const fetchItems = async (storeId: string): Promise<Item[]> => {
  const token = getAccessToken();

  const res = await fetch(`${BACKEND_URL}/api/stores/${storeId}/items`, {
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

    const itemsQuery = getItemsQuery(storeId);
    const items = new Promise((resolve) => {
      resolve(
        queryClient.getQueryData(itemsQuery.queryKey) ??
          queryClient.fetchQuery(itemsQuery),
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
      items: await items,
      itemConfig: await itemConfig,
    });
  };
