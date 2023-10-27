import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { queryClient } from "../../../../query";

const activateItem = (storeId: string, itemId: string) => {
  return fetch(`/api/stores/${storeId}/items/${itemId}/activate`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

const deactivateItem = (storeId: string, itemId: string) => {
  return fetch(`/api/stores/${storeId}/items/${itemId}/deactivate`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

function useUpdateItemActivity() {
  const { storeId } = useParams() as { storeId: string };

  return useMutation({
    mutationFn: ({ itemId, active }: { itemId: string; active: boolean }) => {
      return active
        ? activateItem(storeId, itemId)
        : deactivateItem(storeId, itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["items", storeId]);
    },
  });
}

export default useUpdateItemActivity;
