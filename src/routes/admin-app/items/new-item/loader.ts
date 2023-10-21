import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { getAccessToken } from "../../../auth/utils";
import { BACKEND_URL } from "../../../query";
import { ItemConfig } from "../types";

const fetchItemConfig = async (storeId: string): Promise<ItemConfig> => {
  const token = getAccessToken();

  const res = await fetch(`${BACKEND_URL}/api/stores/${storeId}/item-config`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getItemConfigQuery = (storeId: string) => ({
  queryKey: ["item-config", storeId],
  queryFn: () => fetchItemConfig(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as {
      storeId: string;
    };
    const query = getItemConfigQuery(storeId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
