import { QueryClient } from "react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";
import { Item } from "../../../../types";
import { getAccessToken } from "../../../../auth/utils";

const fetchItemToBeEdited = async (itemId: string): Promise<Item> => {
  const token = getAccessToken();

  const res = await fetch(`/api/admin/items/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const getItemToBeEditedQuery = (itemId: string) => ({
  queryKey: ["admin-items", itemId],
  queryFn: () => fetchItemToBeEdited(itemId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { itemId } = params as { itemId: string };

    const itemToBeEditedQuery = getItemToBeEditedQuery(itemId);
    const itemToBeEdited = new Promise((resolve) => {
      resolve(
        queryClient.getQueryData(itemToBeEditedQuery.queryKey) ??
          queryClient.fetchQuery(itemToBeEditedQuery),
      );
    });

    return defer({
      itemToBeEdited: await itemToBeEdited,
    });
  };
