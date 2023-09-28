import { rest } from "msw";

async function fetchData(storeId: string, type: string) {
  const module = await import(/* @vite-ignore */ `./core_${storeId}/${type}`);
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

export const userAppHandlers = [getOwner, getMainPageConfig, getItems];
