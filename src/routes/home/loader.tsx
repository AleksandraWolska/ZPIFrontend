import { QueryClient } from "react-query";
import { BACKEND_URL } from "../../query";
import { StoreSummary } from "../../types";

const fetchAllStores = async (): Promise<StoreSummary[] | null> => {
  const res = await fetch(`${BACKEND_URL}/stores/all`, {});

  if (!res.ok) {
    throw new Response(res.body, { status: res.status });
  }

  return res.json();
};

export const getAllStoresQuery = () => ({
  queryKey: ["all-stores"],
  queryFn: () => fetchAllStores(),
});

export const loader = (queryClient: QueryClient) => async () => {
  const query = getAllStoresQuery();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
