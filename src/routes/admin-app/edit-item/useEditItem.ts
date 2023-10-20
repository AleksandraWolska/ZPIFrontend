import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getItemQuery } from "./loader";
import { Item } from "../../../types";

function useEditItem() {
  const { storeId, itemId } = useParams() as {
    storeId: string;
    itemId: string;
  };

  const { data } = useQuery(getItemQuery(storeId, itemId)) as {
    data: Item;
  };

  return data;
}

export default useEditItem;
