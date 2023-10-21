import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getEnhancedItemQuery } from "./loader";
import { EnhancedItem } from "../types";

function useEditItem() {
  const { storeId, itemId } = useParams() as {
    storeId: string;
    itemId: string;
  };

  const { data } = useQuery(getEnhancedItemQuery(storeId, itemId)) as {
    data: EnhancedItem;
  };

  return data;
}

export default useEditItem;
