import { QueryClient } from "react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";
import { Item } from "../../../types";
import { CommentList, DetailsPageConfig } from "../types";
import { BACKEND_URL } from "../../../query";
import { getAccessToken } from "../../../auth/utils";

const fetchDetailsConfig = async (
  storeId: string,
): Promise<DetailsPageConfig> => {
  const token = getAccessToken();
  const res = await fetch(
    // toggled, as backend do not send attributes in detailsPageCongig, as expected
    // `${BACKEND_URL}/store-configs/${storeId}/detailsPageConfig`,
    `${BACKEND_URL}/store-configs/${storeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
};

export const getDetailsConfigQuery = (storeId: string) => ({
  queryKey: ["detailsPageConfig", storeId],
  queryFn: async () => fetchDetailsConfig(storeId),
});

const fetchItemDetails = async (
  storeId: string,
  itemId: string,
): Promise<Item> => {
  const token = getAccessToken();
  const res = await fetch(`${BACKEND_URL}/stores/${storeId}/items/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
  const token = getAccessToken();
  const res = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? `${BACKEND_URL}/stores/${storeId}/items/${itemId}/comments`
        : `${BACKEND_URL}/items/${itemId}/comments`
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
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
