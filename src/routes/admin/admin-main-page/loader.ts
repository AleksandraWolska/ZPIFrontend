import { QueryClient } from "react-query";
import { getAccessToken } from "../../../auth/utils";
import { BACKEND_URL } from "../../../query";
import { StoreSummary } from "../../../types";

const fetchAdminStores = async (): Promise<StoreSummary[] | null> => {
  const token = getAccessToken();

  const res = await fetch(`${BACKEND_URL}/store-configs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
};

export const getAdminStoresQuery = () => ({
  queryKey: ["admin-stores"],
  queryFn: () => fetchAdminStores(),
});

export const loader = (queryClient: QueryClient) => async () => {
  const query = getAdminStoresQuery();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
