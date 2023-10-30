import { QueryClient } from "react-query";
import { StoreConfig } from "../../types";
import { getAccessToken } from "../../auth/utils";

const fetchStoreConfig = async (): Promise<StoreConfig> => {
  const token = getAccessToken();

  const res = await fetch(`/api/admin/store-config`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const getStoreConfigQuery = () => ({
  queryKey: ["admin-store-config"],
  queryFn: () => fetchStoreConfig(),
});

export const loader = (queryClient: QueryClient) => async () => {
  const query = getStoreConfigQuery();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
