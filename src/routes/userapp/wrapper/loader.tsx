import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { StoreConfig } from "../../../types";
import { getAccessToken } from "../../../auth/utils";

const fetchOwner = async (storeId: string): Promise<StoreConfig["owner"]> => {
  const token = getAccessToken();

  const res = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? `/api/stores/${storeId}/owner`
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

export const getOwnerQuery = (storeId: string) => ({
  queryKey: ["owner", storeId],
  queryFn: async () => fetchOwner(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as { storeId: string };
    const query = getOwnerQuery(storeId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
