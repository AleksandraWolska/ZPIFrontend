import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getEnhancedItemsQuery } from "./loader";
import { EnhancedItem } from "../types";

function useEnhancedItems() {
  const params = useParams() as { storeId: string };

  const { data } = useQuery(getEnhancedItemsQuery(params.storeId)) as {
    data: EnhancedItem[];
  };

  return data;
}

export default useEnhancedItems;
