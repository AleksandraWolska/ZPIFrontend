import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { NewItemConfig } from "./types";

const fetchNewItemConfig = async (storeId: string): Promise<NewItemConfig> => {
  const res = await fetch(
    `${
      process.env.NODE_ENV === "development" ? "" : "https://zpibackend.fly.dev"
    }/api/stores/${storeId}/new-item-config`,
  );
  return res.json();
};

export const getNewItemConfigQuery = (storeId: string) => ({
  queryKey: ["new-item-config", storeId],
  queryFn: () => fetchNewItemConfig(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as {
      storeId: string;
    };
    const query = getNewItemConfigQuery(storeId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
