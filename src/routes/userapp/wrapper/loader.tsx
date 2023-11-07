import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { StoreConfig } from "../../../types";
import { getAccessToken } from "../../../auth/utils";

const fetchStoreConfig = async (storeId: string): Promise<StoreConfig> => {
  const token = getAccessToken();

  const res = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? `/api/stores/${storeId}/store-config`
        : "https://zpibackend.fly.dev/store-configs"
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

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
