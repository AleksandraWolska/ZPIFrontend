import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { ItemSchema } from "../types";
import { getAccessToken } from "../../../auth/utils";
import { BACKEND_URL } from "../../../query";

const fetchItemSchemas = async (storeId: string): Promise<ItemSchema[]> => {
  const token = getAccessToken();

  const res = await fetch(`${BACKEND_URL}/api/admin/${storeId}/item-schemas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getItemSchemasQuery = (storeId: string) => ({
  queryKey: ["items-schemas", storeId],
  queryFn: () => fetchItemSchemas(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as {
      storeId: string;
    };
    const query = getItemSchemasQuery(storeId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
