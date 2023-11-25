import { useQuery } from "react-query";
import { getAdminStoresQuery } from "./loader";
import { StoreSummary } from "../../../types";

function useAdminStores() {
  const { data } = useQuery(getAdminStoresQuery()) as {
    data: StoreSummary[];
  };

  return data;
}

export default useAdminStores;
