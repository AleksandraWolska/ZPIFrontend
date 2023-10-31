import { useMutation } from "react-query";
import { StoreConfig } from "../../types";
import { getAccessToken } from "../../auth/utils";
import { queryClient } from "../../query";

const addStoreConfig = (storeConfig: StoreConfig) => {
  const token = getAccessToken();

  return fetch(`/api/admin/store-config`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(storeConfig),
  });
};

function useAddStoreConfig() {
  return useMutation({
    mutationFn: (storeConfig: StoreConfig) => {
      return addStoreConfig(storeConfig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-store-config"]);
    },
  });
}

export default useAddStoreConfig;
