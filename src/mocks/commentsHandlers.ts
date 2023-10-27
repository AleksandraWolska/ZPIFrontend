import { rest } from "msw";
import { fetchData } from "./utils";

const importComments = async (storeId: string) => {
  return (await fetchData(storeId, "comments")) as Comment[];
};

const getCommentsList = rest.get(
  "/api/stores/:storeId/items/:itemId/comments",
  async (req, res, ctx) => {
    const { storeId } = req.params;

    const comments = await importComments(storeId.toString());

    return res(ctx.status(200), ctx.json(comments));
  },
);

export const commentsHandlers = [getCommentsList];
