import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getItemSchemaQuery } from "./loader";
import { ItemSchema } from "../types";

function useEditItem() {
  const { storeId, itemId } = useParams() as {
    storeId: string;
    itemId: string;
  };

  const { data } = useQuery(getItemSchemaQuery(storeId, itemId)) as {
    data: ItemSchema;
  };

  return data;
}

export default useEditItem;
