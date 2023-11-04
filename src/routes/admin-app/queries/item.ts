import { Item } from "../../../types";
import { getAccessToken } from "../../../auth/utils";

export const fetchItem = async (itemId: string): Promise<Item> => {
  const token = getAccessToken();

  const res = await fetch(`/api/admin/items/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
export const getItemQuery = (itemId: string) => ({
  queryKey: ["admin-items", itemId],
  queryFn: () => fetchItem(itemId),
});
