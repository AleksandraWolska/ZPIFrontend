import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { NewItemConfig } from "./types";
import { getAccessToken } from "../../../auth/utils";
import { BACKEND_URL } from "../../../query";

const fetchNewItemConfig = async (storeId: string): Promise<NewItemConfig> => {
  const token = getAccessToken();

  const res = await fetch(
    `${BACKEND_URL}/api/stores/${storeId}/new-item-config`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
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
