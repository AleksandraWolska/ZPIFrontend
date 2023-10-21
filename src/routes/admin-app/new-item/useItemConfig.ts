import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getItemConfigQuery } from "./loader";

import { ItemConfig } from "../types";

function useItemConfig() {
  const params = useParams() as { storeId: string };

  const { data } = useQuery(getItemConfigQuery(params.storeId)) as {
    data: ItemConfig;
  };

  return data;
}

export default useItemConfig;
