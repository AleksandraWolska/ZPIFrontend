import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Item } from "../../../types";
import { getItemQuery } from "../queries/item";

function useItemById(id: string) {
  const params = useParams() as { storeId: string };
  const { data } = useQuery(getItemQuery(id, params.storeId)) as { data: Item };

  return data;
}

export default useItemById;
