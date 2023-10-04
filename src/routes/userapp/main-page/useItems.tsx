import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getItemsQuery } from "./loader";
import { ItemInfo } from "../../../types";

function useItems() {
  const params = useParams() as { storeId: string };

  const { data } = useQuery(getItemsQuery(params.storeId)) as {
    data: ItemInfo[];
  };

  return data;
}

export default useItems;
