import { ItemConfig } from "../../types";

const fetchItemConfig = async (storeId: string): Promise<ItemConfig> => {
  const res = await fetch(`/api/stores/${storeId}/item-config`);
  return res.json();
};

export const getItemConfigQuery = (storeId: string) => ({
  queryKey: ["item-config", storeId],
  queryFn: () => fetchItemConfig(storeId),
});
