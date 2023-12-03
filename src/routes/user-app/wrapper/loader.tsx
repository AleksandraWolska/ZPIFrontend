import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { StoreConfig } from "../../../types";
import { BACKEND_URL } from "../../../query";

const fetchStoreConfig = async (storeId: string): Promise<StoreConfig> => {
  const res = await fetch(`${BACKEND_URL}/store-configs/${storeId}`);
  return res.json();
};

export const getStoreConfigQuery = (storeId: string) => ({
  queryKey: ["store-config", storeId],
  queryFn: async () => fetchStoreConfig(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as { storeId: string };
    const query = getStoreConfigQuery(storeId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
