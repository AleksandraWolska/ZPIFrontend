import { useQuery } from "react-query";
import { Item } from "../../../types";
import { getItemQuery } from "../queries/item";

function useItemById(id: string) {
  const { data } = useQuery(getItemQuery(id)) as { data: Item };

  return data;
}

export default useItemById;
