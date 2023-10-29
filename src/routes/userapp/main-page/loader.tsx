import { QueryClient } from "react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";
import { MainPageConfig } from "../types";
import { ItemInfo } from "../../../types";
import { getAccessToken } from "../../../auth/utils";

const fetchConfig = async (storeId: string): Promise<MainPageConfig> => {
  const token = getAccessToken();

  const res = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? `/api/stores/${storeId}/main-page-config`
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

export const getConfigQuery = (storeId: string) => ({
  queryKey: ["mainPageConfig", storeId],
  queryFn: async () => fetchConfig(storeId),
});

const fetchItems = async (storeId: string): Promise<ItemInfo[]> => {
  const res = await fetch(`/api/stores/${storeId}/items`);
  return res.json();
};

export const getItemsQuery = (storeId: string) => ({
  queryKey: ["items", storeId],
  queryFn: async () => fetchItems(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as { storeId: string };

    const configQuery = getConfigQuery(storeId);
    const config = new Promise((resolve) => {
      resolve(
        queryClient.getQueryData(configQuery.queryKey) ??
          queryClient.fetchQuery(configQuery),
      );
    });

    const itemsQuery = getItemsQuery(storeId);
    const items = new Promise((resolve) => {
      resolve(
        queryClient.getQueryData(itemsQuery.queryKey) ??
          queryClient.fetchQuery(itemsQuery),
      );
    });

    return defer({ config: await config, items: await items });
  };
