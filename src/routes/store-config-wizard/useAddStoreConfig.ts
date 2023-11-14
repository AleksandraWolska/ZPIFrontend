import { useMutation } from "react-query";
import { StoreConfig } from "../../types";
import { getAccessToken } from "../../auth/utils";
import { BACKEND_URL, queryClient } from "../../query";

const addStoreConfig = (storeConfig: StoreConfig) => {
  const token = getAccessToken();

  return fetch(
    `${
      process.env.NODE_ENV === "development"
        ? `/api/admin/store-config`
        : `${BACKEND_URL}/store-configs`
    }`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeConfig),
    },
  );
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
