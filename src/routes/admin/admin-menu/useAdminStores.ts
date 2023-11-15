import { useQuery } from "react-query";
import { getAdminStoresQuery, StoreSummary } from "./loader";

function useAdminStores() {
  const { data } = useQuery(getAdminStoresQuery()) as {
    data: StoreSummary[];
  };

  return data;
}

export default useAdminStores;
