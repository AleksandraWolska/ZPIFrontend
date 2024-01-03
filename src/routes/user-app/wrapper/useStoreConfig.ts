import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getStoreConfigQuery } from "./loader";
import { StoreConfig } from "../../../types";

function useStoreConfig() {
  const params = useParams() as { storeId: string };

  const { data } = useQuery(getStoreConfigQuery(params.storeId)) as {
    data: StoreConfig;
  };

  return data;
}

export default useStoreConfig;
