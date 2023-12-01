import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { BACKEND_URL, queryClient } from "../../../../query";
import { getAccessToken } from "../../../../auth/utils";

const activateItem = (storeId: string, itemId: string) => {
  const token = getAccessToken();

  return fetch(`${BACKEND_URL}/stores/${storeId}/items/${itemId}/activate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deactivateItem = (storeId: string, itemId: string) => {
  const token = getAccessToken();

  return fetch(`${BACKEND_URL}/stores/${storeId}/items/${itemId}/deactivate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
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
