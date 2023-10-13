import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getNewItemConfigQuery } from "./loader";
import { NewItemConfig } from "./types";

function useNewItemConfig() {
  const params = useParams() as { storeId: string };

  const { data } = useQuery(getNewItemConfigQuery(params.storeId)) as {
    data: NewItemConfig;
  };

  return data;
}

export default useNewItemConfig;
