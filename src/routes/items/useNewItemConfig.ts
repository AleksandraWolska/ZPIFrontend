import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAddItemConfigQuery } from "./loader";
import { NewItemConfig } from "./types";

function useNewItemConfig() {
  const params = useParams() as { storeId: string };

  const { data } = useQuery(getAddItemConfigQuery(params.storeId)) as {
    data: NewItemConfig;
  };

  return data;
}

export default useNewItemConfig;
