import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Item } from "../../../../types";
import { getItemQuery } from "../../queries/item";

function useItemToBeEdited() {
  const params = useParams() as { storeId: string; itemId: string };

  const { data } = useQuery(getItemQuery(params.itemId, params.storeId)) as {
    data: Item;
  };

  return data;
}

export default useItemToBeEdited;
