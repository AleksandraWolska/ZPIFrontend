import { QueryClient } from "react-query";
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
  const query = getItemsQuery();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
