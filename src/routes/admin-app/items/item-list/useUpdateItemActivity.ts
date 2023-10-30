import { useMutation } from "react-query";
import { queryClient } from "../../../../query";
import { getAccessToken } from "../../../../auth/utils";

const activateItem = (itemId: string) => {
  const token = getAccessToken();

  return fetch(`/api/admin/items/${itemId}/activate`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deactivateItem = (itemId: string) => {
  const token = getAccessToken();

  return fetch(`/api/admin/items/${itemId}/deactivate`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

function useUpdateItemActivity() {
  return useMutation({
    mutationFn: ({ itemId, active }: { itemId: string; active: boolean }) => {
      return active ? activateItem(itemId) : deactivateItem(itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-items"]);
    },
  });
}

export default useUpdateItemActivity;
