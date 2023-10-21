import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getItemSchemasQuery } from "./loader";
import { ItemSchema } from "../types";

function useItemSchemas() {
  const params = useParams() as { storeId: string };

  const { data } = useQuery(getItemSchemasQuery(params.storeId)) as {
    data: ItemSchema[];
  };

  return data;
}

export default useItemSchemas;
