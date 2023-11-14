import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { BACKEND_URL, queryClient } from "../../../../query";
import { getAccessToken } from "../../../../auth/utils";

const activateItem = (itemId: string, storeId: string) => {
  const token = getAccessToken();

  return fetch(
    `${
      process.env.NODE_ENV === "development"
        ? `/api/admin/items/${itemId}/activate`
        : `${BACKEND_URL}/stores/${storeId}/items/${itemId}/activate`
    }`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

const deactivateItem = (itemId: string, storeId: string) => {
  const token = getAccessToken();

  return fetch(
    `${
      process.env.NODE_ENV === "development"
        ? `/api/admin/items/${itemId}/deactivate`
        : `${BACKEND_URL}/stores/${storeId}/items/${itemId}/deactivate`
    }`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

function useUpdateItemActivity() {
  const params = useParams() as { storeId: string };
  return useMutation({
    mutationFn: ({ itemId, active }: { itemId: string; active: boolean }) => {
      return active
        ? activateItem(itemId, params.storeId)
        : deactivateItem(itemId, params.storeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-items"]);
    },
  });
}

export default useUpdateItemActivity;
