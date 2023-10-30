import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getItemToBeEditedQuery } from "./loader";
import { Item } from "../../../../types";

function useItemToBeEdited() {
  const { itemId } = useParams() as {
    itemId: string;
  };

  const { data } = useQuery(getItemToBeEditedQuery(itemId)) as {
    data: Item;
  };

  return data;
}

export default useItemToBeEdited;
