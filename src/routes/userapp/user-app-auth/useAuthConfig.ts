import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { StoreConfig } from "../../../types";
import { getAuthConfigQuery } from "./loader";

function useAuthConfig() {
  const params = useParams() as { storeId: string };

  const { data } = useQuery(getAuthConfigQuery(params.storeId)) as {
    data: StoreConfig["authConfig"];
  };

  return data;
}

export default useAuthConfig;
