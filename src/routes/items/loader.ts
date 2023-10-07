import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { NewItemConfig } from "./types";

const fetchAddItemConfig = async (storeId: string): Promise<NewItemConfig> => {
  const res = await fetch(`/api/stores/${storeId}/add-item-config`);
  return res.json();
};

export const getAddItemConfigQuery = (storeId: string) => ({
  queryKey: ["add-item-config", storeId],
  queryFn: () => fetchAddItemConfig(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as { storeId: string };
    const query = getAddItemConfigQuery(storeId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
