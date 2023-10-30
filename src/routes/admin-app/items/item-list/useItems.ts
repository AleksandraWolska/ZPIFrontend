import { useQuery } from "react-query";
import { getItemsQuery } from "./loader";
import { Item } from "../../../../types";

function useItems() {
  const { data } = useQuery(getItemsQuery()) as { data: Item[] };

  return data;
}

export default useItems;
