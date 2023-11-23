import { useMutation } from "react-query";
import { getAccessToken } from "../../auth/utils";
import { BACKEND_URL, queryClient } from "../../query";
import {
  CustomAttributeSpecWithoutId,
  StoreConfigWithoutAnyIds,
  StoreConfigWithoutIds,
} from "../admin/types";
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
  };
};

export const removeAllIdsFromStoreConfig = (
  storeConfig: StoreConfig,
): StoreConfigWithoutAnyIds => {
  const { storeConfigId, customAttributesSpec, owner, ...rest } = storeConfig;

  const { ownerId, ...restOwner } = owner;

  const customAttributesSpecWithoutIds: CustomAttributeSpecWithoutId[] =
    customAttributesSpec.map(({ id, ...restSpec }) => restSpec);

  return {
    ...rest,
    owner: {
      ...restOwner,
    },
    customAttributesSpec: customAttributesSpecWithoutIds,
  };
};

const addStoreConfig = (
  storeConfig: StoreConfigWithoutIds | StoreConfigWithoutAnyIds,
) => {
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
    mutationFn: (
      storeConfig: StoreConfigWithoutIds | StoreConfigWithoutAnyIds,
    ) => {
      return addStoreConfig(storeConfig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-stores"]);
    },
  });
}

export default useAddStoreConfig;
