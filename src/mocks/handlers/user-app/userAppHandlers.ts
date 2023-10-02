import { rest } from "msw";

/*
storeIds from 1-10 are reserved for core configurations
What is below might look weird but goal was to enable using any other storeId
and it uses default folder core_0

Sorry for dynamic import! Seemed clearer than importing all cores
*/
async function fetchData(storeId: string, type: string) {
  const number = parseInt(storeId, 10);
  console.log(`numer store${number}`);
  const id = number && number > 0 && number < 10 ? storeId : "0";
  console.log(`numer store${id}`);
  console.log(`type: ${type}`);
  const module = await import(/* @vite-ignore */ `./core_${id}/${type}`);
  return module.default;
}

const getOwner = rest.get(
  "/api/stores/:storeId/owner",
  async (req, res, ctx) => {
    const { storeId } = req.params;
    console.log("requested owner for storeId: ", storeId);

    if (typeof storeId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid storeId"));
    }

    const data = await fetchData(storeId, "dummyOwner");
    return res(ctx.status(200), ctx.json(data));
  },
);

const getMainPageConfig = rest.get(
  "/api/stores/:storeId/main-page-config",
  async (req, res, ctx) => {
    const { storeId } = req.params;
    console.log("requested main page config for storeId: ", storeId);

    if (typeof storeId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid storeId"));
    }
    const data = await fetchData(storeId, "dummyMainPageConfig");

    return res(ctx.status(200), ctx.json(data));
  },
);

const getItems = rest.get(
  "/api/stores/:storeId/items",
  async (req, res, ctx) => {
    const { storeId } = req.params;

    if (typeof storeId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid storeId"));
    }
    const data = await fetchData(storeId, "dummyItems");

    return res(ctx.status(200), ctx.json(data));
  },
);

const getDetailsPageConfig = rest.get(
  "/api/stores/:storeId/details-page-config",
  async (req, res, ctx) => {
    const { storeId } = req.params;
    console.log("requested details page config for storeId: ", storeId);

    if (typeof storeId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid storeId"));
    }
    const data = await fetchData(storeId, "dummyDetailsPageConfig");

    return res(ctx.status(200), ctx.json(data));
  },
);

const getItemDetails = rest.get(
  "/api/stores/:storeId/items/:itemId",
  async (req, res, ctx) => {
    const { storeId, itemId } = req.params;

    if (typeof storeId !== "string" || typeof itemId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid parameters"));
    }
    console.log(`dummyite nr ${itemId} of store ${storeId}`);
    const data = await fetchData(storeId, `items/dummyItem_${itemId}`);

    return res(ctx.status(200), ctx.json(data));
  },
);

const getCommentsList = rest.get(
  "/api/stores/:storeId/items/:itemId/comments",
  async (req, res, ctx) => {
    const { storeId, itemId } = req.params;

    if (typeof storeId !== "string" || typeof itemId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid parameters"));
    }

    const data = await fetchData(storeId, `items/dummyComments_${itemId}`);

    return res(ctx.status(200), ctx.json(data));
  },
);

export const userAppHandlers = [
  getOwner,
  getMainPageConfig,
  getDetailsPageConfig,
  getItems,
  getItemDetails,
  getCommentsList,
];
