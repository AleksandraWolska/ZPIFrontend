import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { StoreConfig } from "../../../types";
import { getStoreConfigQuery } from "./loader";

function useStoreConfig() {
  const params = useParams() as { storeId: string };
  const { data } = useQuery(getStoreConfigQuery(params.storeId)) as {
    data: StoreConfig;
  };

  return data;
}

export default useStoreConfig;
