import { useMutation } from "react-query";
import { getAccessToken } from "../../../auth/utils";
import { BACKEND_URL, queryClient } from "../../../query";

const deleteStore = (storeId: string) => {
  const token = getAccessToken();

  return fetch(`${BACKEND_URL}/stores/${storeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

function useDeleteStore() {
  return useMutation({
    mutationFn: ({ storeId }: { storeId: string }) => {
      return deleteStore(storeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-stores"]);
    },
  });
}

export default useDeleteStore;
