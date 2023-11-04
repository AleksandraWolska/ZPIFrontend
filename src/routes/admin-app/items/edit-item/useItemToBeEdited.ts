import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Item } from "../../../../types";
import { getItemQuery } from "../../queries/item";

function useItemToBeEdited() {
  const { itemId } = useParams() as {
    itemId: string;
  };

  const { data } = useQuery(getItemQuery(itemId)) as {
    data: Item;
  };

  return data;
}

export default useItemToBeEdited;
