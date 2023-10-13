import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { NewItemSchema } from "./types";

const addNewItem = (storeId: string, newItemSchema: NewItemSchema) => {
  return fetch(`/api/stores/${storeId}/add-item`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItemSchema),
  });
};

function useAddNewItem() {
  const params = useParams() as { storeId: string };

  return useMutation({
    mutationFn: (newSchema: NewItemSchema) => {
      return addNewItem(params.storeId, newSchema);
    },
  });
}

export default useAddNewItem;
