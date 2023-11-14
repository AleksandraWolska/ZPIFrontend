import { Item } from "../../../types";
import { getAccessToken } from "../../../auth/utils";
import { BACKEND_URL } from "../../../query";

export const fetchItem = async (
  itemId: string,
  storeId: string,
): Promise<Item> => {
  const token = getAccessToken();

  const res = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? `/api/admin/items/${itemId}`
        : `${BACKEND_URL}/stores/${storeId}/items/${itemId}`
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.json();
};
export const getItemQuery = (itemId: string, storeId: string) => ({
  queryKey: ["admin-items", itemId],
  queryFn: () => fetchItem(itemId, storeId),
});
