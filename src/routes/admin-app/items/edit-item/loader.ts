import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { getItemQuery } from "../../queries/item";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { itemId } = params as { itemId: string };

    const query = getItemQuery(itemId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
