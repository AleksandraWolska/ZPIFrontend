import { QueryClient } from "react-query";
import { getAccessToken } from "../../../auth/utils";
import { BACKEND_URL } from "../../../query";

export type StoreSummary = {
  storeConfigId: string;
  name: string;
};

const fetchAdminStores = async (): Promise<StoreSummary[]> => {
  const token = getAccessToken();

  const res = await fetch(`${BACKEND_URL}/store-configs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
