import { QueryClient } from "react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";
import { Item } from "../../../types";
import { CommentList } from "../types";
import { BACKEND_URL } from "../../../query";

const fetchItemDetails = async (
  storeId: string,
  itemId: string,
): Promise<Item> => {
  const res = await fetch(`${BACKEND_URL}/stores/${storeId}/items/${itemId}`);
  return res.json();
};

export const getItemDetailsQuery = (storeId: string, itemId: string) => ({
  queryKey: ["itemDetails", storeId, itemId],
  queryFn: async () => fetchItemDetails(storeId, itemId),
});

export const getCommentsListQuery = (storeId: string, itemId: string) => ({
  queryKey: ["commentsList", storeId, itemId],
  queryFn: async () => fetchCommentsList(itemId),
});

const fetchCommentsList = async (itemId: string): Promise<CommentList> => {
  const res = await fetch(`${BACKEND_URL}/items/${itemId}/comments`);
  return res.json();
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId, itemId } = params as { storeId: string; itemId: string };

    const itemDetailsQuery = getItemDetailsQuery(storeId, itemId);
    const item = new Promise((resolve) => {
      resolve(
        queryClient.getQueryData(itemDetailsQuery.queryKey) ??
          queryClient.fetchQuery(itemDetailsQuery),
      );
    });

    const commentsListQuery = getCommentsListQuery(storeId, itemId);
    const commentsList = new Promise((resolve) => {
      resolve(
        queryClient.getQueryData(commentsListQuery.queryKey) ??
          queryClient.fetchQuery(commentsListQuery),
      );
    });

    return defer({
      item: await item,
      commentsList: await commentsList,
    });
  };
