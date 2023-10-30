import { useQuery } from "react-query";
import { StoreConfig } from "../../types";
import { getStoreConfigQuery } from "./loader";

function useStoreConfig() {
  const { data } = useQuery(getStoreConfigQuery()) as { data: StoreConfig };

  return data;
}

export default useStoreConfig;
