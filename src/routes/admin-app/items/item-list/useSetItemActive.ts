import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { queryClient } from "../../../../query";

const activateItem = (storeId: string, itemId: string) => {
  return fetch(`/api/admin/${storeId}/enhanced-items/${itemId}/activate`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

const deactivateItem = (storeId: string, itemId: string) => {
  return fetch(`/api/admin/${storeId}/enhanced-items/${itemId}/deactivate`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

function useSetItemActive() {
  const { storeId } = useParams() as { storeId: string };

  return useMutation({
    mutationFn: ({ itemId, active }: { itemId: string; active: boolean }) => {
      return active
        ? activateItem(storeId, itemId)
        : deactivateItem(storeId, itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["enhanced-items", storeId]);
    },
  });
}

export default useSetItemActive;
