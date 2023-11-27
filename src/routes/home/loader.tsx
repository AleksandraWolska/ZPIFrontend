import { defer } from "react-router-dom";
import { BACKEND_URL } from "../../query";
import { StoreSummary } from "../../types";

export async function loader() {
  const allStoresPromise = getAllStoresQuery().queryFn();

  return defer({
    allStores: allStoresPromise,
  });
}

const fetchAllStores = async (): Promise<StoreSummary[] | null> => {
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
