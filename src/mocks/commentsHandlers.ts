import { rest } from "msw";
import { comments } from "./data/common/comments";

const getCommentsList = rest.get(
  "/api/items/:itemId/comments",
  async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(comments));
  },
);

export const commentsHandlers = [getCommentsList];
