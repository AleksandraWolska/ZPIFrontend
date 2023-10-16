import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { Item } from "../../../types";

const fetchItems = async (storeId: string): Promise<Item[]> => {
  const res = await fetch(
    `${
      process.env.NODE_ENV === "development" ? "" : "http://zpibackend.fly.dev"
    }/api/admin/${storeId}/items`,
  );
  return res.json();
};

export const getItemsQuery = (storeId: string) => ({
  queryKey: ["items", storeId],
  queryFn: () => fetchItems(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as {
      storeId: string;
    };
    const query = getItemsQuery(storeId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
