import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getOwnerQuery } from "./loader";
import { StoreConfig } from "../../../types";

function useOwner() {
  const params = useParams() as { storeId: string };

  const { data } = useQuery(getOwnerQuery(params.storeId)) as {
    data: StoreConfig["owner"];
  };

  return data;
}

export default useOwner;
