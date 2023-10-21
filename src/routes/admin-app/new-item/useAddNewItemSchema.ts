import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { NewItemSchema } from "./types";
import { queryClient } from "../../../query";

const addNewItemSchema = (storeId: string, newItemSchema: NewItemSchema) => {
  return fetch(`/api/stores/${storeId}/add-item-schema`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItemSchema),
  });
};

function useAddNewItemSchema() {
  const params = useParams() as { storeId: string };

  return useMutation({
    mutationFn: (newSchema: NewItemSchema) => {
      return addNewItemSchema(params.storeId, newSchema);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["item-schemas", params.storeId]);
    },
  });
}

export default useAddNewItemSchema;
