import { QueryClient } from "react-query";
import { defer } from "react-router-dom";
import { getAccessToken } from "../../../../auth/utils";
import { BACKEND_URL } from "../../../../query";
import { Item } from "../../../../types";

const fetchItems = async (): Promise<Item[]> => {
  const token = getAccessToken();

  const res = await fetch(`${BACKEND_URL}/api/admin/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const getItemsQuery = () => ({
  queryKey: ["admin-items"],
  queryFn: () => fetchItems(),
});

export const loader = (queryClient: QueryClient) => async () => {
  const itemsQuery = getItemsQuery();
  const items = new Promise((resolve) => {
    resolve(
      queryClient.getQueryData(itemsQuery.queryKey) ??
        queryClient.fetchQuery(itemsQuery),
    );
  });

  return defer({
    items: await items,
  });
};
