import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getItemToBeEditedQuery } from "./loader";
import { Item } from "../../../../types";

function useItemToBeEdited() {
  const { storeId, itemId } = useParams() as {
    storeId: string;
    itemId: string;
  };

  const { data } = useQuery(getItemToBeEditedQuery(storeId, itemId)) as {
    data: Item;
  };

  return data;
}

export default useItemToBeEdited;
