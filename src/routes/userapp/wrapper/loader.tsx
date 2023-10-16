import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { StoreConfig } from "../../../types";

const fetchOwner = async (storeId: string): Promise<StoreConfig["owner"]> => {
  const res = await fetch(
    `${
      process.env.NODE_ENV === "development" ? "" : "https://zpibackend.fly.dev"
    }/store-configs`,
  );
  console.log(storeId)
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
