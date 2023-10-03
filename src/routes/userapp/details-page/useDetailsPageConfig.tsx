import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getDetailsConfigQuery } from "./loader";
import { DetailsPageConfig } from "../types";

function useDetailsPageConfig() {
  const params = useParams() as { storeId: string };

  const { data } = useQuery(getDetailsConfigQuery(params.storeId)) as {
    data: DetailsPageConfig;
  };

  return data;
}

export default useDetailsPageConfig;
