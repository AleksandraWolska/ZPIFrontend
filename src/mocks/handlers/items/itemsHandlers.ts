import { rest } from "msw";

const getDummyNewItemConfig = rest.get(
  "/api/stores/:storeId/new-item-config",
  async (req, res, ctx) => {
    const { storeId } = req.params;

    if (storeId === "1") {
      const config = (await import("./store-1/dummyNewItemConfig")).default;
      return res(ctx.status(200), ctx.json(config));
    }
    if (storeId === "2") {
      const config = (await import("./store-2/dummyNewItemConfig")).default;
      return res(ctx.status(200), ctx.json(config));
    }

    const config = (await import("./store-3/dummyNewItemConfig")).default;
    return res(ctx.status(200), ctx.json(config));
  },
);

const addItem = rest.post("/api/stores/:storeId/add-item", (req, res, ctx) => {
  console.log("req", req.json());

  return res(ctx.status(200));
});

export const itemsHandlers = [getDummyNewItemConfig, addItem];
