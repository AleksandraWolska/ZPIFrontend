import { defer } from "react-router-dom";
import { QueryClient } from "react-query";
import { BACKEND_URL } from "../../query";
import { StoreSummary } from "../../types";

const fetchAllStores = async (): Promise<StoreSummary[]> => {
  const res = await fetch(`${BACKEND_URL}/stores/all`);

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

  const allStores = new Promise((resolve) => {
    resolve(
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query),
    );
  });

  return defer({
    allStores,
  });
};
