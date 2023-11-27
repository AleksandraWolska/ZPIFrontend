import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../../../auth/utils";
import { BACKEND_URL, queryClient } from "../../../query";
import { StoreConfig } from "../../../types";

const editStoreConfig = (
  storeConfig: Omit<StoreConfig, "core">,
  storeId: string,
) => {
  const token = getAccessToken();

  return fetch(`${BACKEND_URL}/store-configs/${storeId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(storeConfig),
  });
};

function useEditStoreConfig() {
  const { storeId } = useParams() as { storeId: string };

  return useMutation({
    mutationFn: (storeConfig: Omit<StoreConfig, "core">) => {
      return editStoreConfig(storeConfig, storeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["store-configs", storeId]);
    },
  });
}

export default useEditStoreConfig;
