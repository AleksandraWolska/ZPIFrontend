import { rest } from "msw";
import { fetchData, getStoreMockIdByStoreName } from "./utils";

const importComments = async (storeName: string) => {
  const mockId = await getStoreMockIdByStoreName(storeName);

  return (await fetchData(mockId, "comments")) as Comment[];
};

const getCommentsList = rest.get(
  "/api/stores/:storeName/items/:itemId/comments",
  async (req, res, ctx) => {
    const { storeName } = req.params;

    const comments = await importComments(storeName.toString());

    return res(ctx.status(200), ctx.json(comments));
  },
);

export const commentsHandlers = [getCommentsList];
