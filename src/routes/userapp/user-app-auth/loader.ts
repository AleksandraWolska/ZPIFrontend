import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { getAccessToken } from "../../../auth/utils";
import { StoreConfig } from "../../../types";
import { BACKEND_URL } from "../../../query";

const fetchAuthConfig = async (
  storeId: string,
): Promise<StoreConfig["authConfig"]> => {
  const token = getAccessToken();

  const res = await fetch(`${BACKEND_URL}/api/stores/${storeId}/auth-config`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const getAuthConfigQuery = (storeId: string) => ({
  queryKey: ["authConfig", storeId],
  queryFn: () => fetchAuthConfig(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as {
      storeId: string;
    };
    const query = getAuthConfigQuery(storeId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
