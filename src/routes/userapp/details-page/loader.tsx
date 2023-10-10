import { QueryClient } from "react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";
import { ItemInfo } from "../../../types";
import { CommentList, DetailsPageConfig } from "../types";

const fetchDetailsConfig = async (
  storeId: string,
): Promise<DetailsPageConfig> => {
  const res = await fetch(`/api/stores/${storeId}/details-page-config`);
  return res.json();
};

export const getDetailsConfigQuery = (storeId: string) => ({
  queryKey: ["detailsPageConfig", storeId],
  queryFn: async () => fetchDetailsConfig(storeId),
});

const fetchItemDetails = async (
  storeId: string,
  itemId: string,
): Promise<ItemInfo> => {
  const res = await fetch(`/api/stores/${storeId}/items/${itemId}`);
  return res.json();
};

export const getItemDetailsQuery = (storeId: string, itemId: string) => ({
  queryKey: ["itemDetails", storeId, itemId],
  queryFn: async () => fetchItemDetails(storeId, itemId),
});

export const getCommentsListQuery = (storeId: string, itemId: string) => ({
  queryKey: ["commentsList", storeId, itemId],
  queryFn: async () => fetchCommentsList(storeId, itemId),
});

const fetchCommentsList = async (
  storeId: string,
  itemId: string,
): Promise<CommentList> => {
  const res = await fetch(`/api/stores/${storeId}/items/${itemId}/comments`);
  return res.json();
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId, itemId } = params as { storeId: string; itemId: string };

    const configQuery = getDetailsConfigQuery(storeId);
    const config = new Promise((resolve) => {
      resolve(
        queryClient.getQueryData(configQuery.queryKey) ??
          queryClient.fetchQuery(configQuery),
      );
    });

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
      config: await config,
      item: await item,
      commentsList: await commentsList,
    });
  };
