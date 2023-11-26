import { useQuery } from "react-query";

import { StoreSummary } from "../../types";
import { getAllStoresQuery } from "./loader";

function useAllStores() {
  const { data } = useQuery(getAllStoresQuery()) as {
    data: StoreSummary[] | null;
  };

  return data;
}

export default useAllStores;
