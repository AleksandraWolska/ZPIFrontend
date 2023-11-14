import { LoaderFunctionArgs } from "react-router-dom";
import { QueryClient } from "react-query";
import { StoreConfig } from "../../types";
import { getAccessToken } from "../../auth/utils";
import { BACKEND_URL } from "../../query";

const fetchStoreConfig = async (storeId: string): Promise<StoreConfig> => {
  const token = getAccessToken();

  const res = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? `/api/admin/store-config`
        : `${BACKEND_URL}/store-configs/${storeId}`
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
  queryKey: ["admin-store-config"],
  queryFn: () => fetchStoreConfig(storeId),
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
