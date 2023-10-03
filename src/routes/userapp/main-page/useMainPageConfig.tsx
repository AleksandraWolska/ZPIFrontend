import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getConfigQuery } from "./loader";
import { MainPageConfig } from "../types";

function useMainPageConfig() {
  const params = useParams() as { storeId: string };

  const { data } = useQuery(getConfigQuery(params.storeId)) as {
    data: MainPageConfig;
  };

  return data;
}

export default useMainPageConfig;
