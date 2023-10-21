import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { ItemSchema } from "../types";

const fetchItemSchema = async (
  storeId: string,
  itemId: string,
): Promise<ItemSchema> => {
  const res = await fetch(`/api/admin/${storeId}/item-schemas/${itemId}`);
  return res.json();
};

export const getItemSchemaQuery = (storeId: string, itemId: string) => ({
  queryKey: ["item-schemas", storeId, itemId],
  queryFn: () => fetchItemSchema(storeId, itemId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId, itemId } = params as { storeId: string; itemId: string };
    const query = getItemSchemaQuery(storeId, itemId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
