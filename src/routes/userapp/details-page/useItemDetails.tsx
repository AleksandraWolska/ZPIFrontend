import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getItemDetailsQuery } from "./loader";
import { ItemInfo } from "../../../types";

function useItemDetails() {
  const params = useParams() as { storeId: string; itemId: string };

  const { data } = useQuery(
    getItemDetailsQuery(params.storeId, params.itemId),
  ) as {
    data: ItemInfo;
  };

  return data;
}

export default useItemDetails;
