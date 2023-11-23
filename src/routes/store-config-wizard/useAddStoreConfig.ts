import { useMutation } from "react-query";
import { getAccessToken } from "../../auth/utils";
import { BACKEND_URL, queryClient } from "../../query";
import { StoreConfigWithoutIds } from "../admin/types";
import { StoreConfig } from "../../types";

export const removeIdsFromStoreConfig = (
  storeConfig: StoreConfig,
): StoreConfigWithoutIds => {
  const { storeConfigId, ...rest } = storeConfig;

  const { ownerId, ...restOwner } = rest.owner;

  return {
    ...rest,
    owner: {
      ...restOwner,
    },
    customAttributesSpec: storeConfig.customAttributesSpec.map(
      ({ id, ...restSpec }) => restSpec,
    ),
  };
};

const addStoreConfig = (storeConfig: StoreConfigWithoutIds) => {
  const token = getAccessToken();

  return fetch(`${BACKEND_URL}/store-configs`, {
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
    mutationFn: (storeConfig: StoreConfigWithoutIds) => {
      return addStoreConfig(storeConfig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-stores"]);
    },
  });
}

export default useAddStoreConfig;
