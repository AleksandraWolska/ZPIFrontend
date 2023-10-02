import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAddItemConfigQuery } from "./loader";
import { AddItemConfig } from "./types";

function useNewItem() {
  const params = useParams() as { storeId: string };

  const { data } = useQuery(getAddItemConfigQuery(params.storeId)) as {
    data: AddItemConfig;
  };

  return data;
}

export default useNewItem;
