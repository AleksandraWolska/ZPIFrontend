import { rest } from "msw";
import { dummyMainPageConfig } from "./dummyMainPageConfig";
import { dummyItems } from "./dummyItems";
import { dummyOwner } from "./dummyOwner";

const getOwner = rest.get("/api/stores/:storeId/owner", (req, res, ctx) => {
  const { storeId } = req.params;

  console.log("requested owner for storeId: ", storeId);

  return res(ctx.status(200), ctx.json(dummyOwner));
});

const getMainPageConfig = rest.get(
  "/api/stores/:storeId/main-page-config",
  (req, res, ctx) => {
    const { storeId } = req.params;

    console.log("requested main page config for storeId: ", storeId);

    return res(ctx.status(200), ctx.json(dummyMainPageConfig));
  },
);

const getItems = rest.get("/api/stores/:storeId/items", (req, res, ctx) => {
  const { storeId } = req.params;

  console.log("requested items for storeId: ", storeId);

  return res(ctx.status(200), ctx.json(dummyItems));
});

export const userAppHandlers = [getOwner, getMainPageConfig, getItems];
