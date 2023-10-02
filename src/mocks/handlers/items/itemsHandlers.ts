import { rest } from "msw";
import { dummyAddItemConfig } from "./dummyAddItemConfig";

const getDummyCustomAttributesSpec = rest.get(
  "/api/stores/:storeId/add-item-config",
  (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummyAddItemConfig));
  },
);

export const itemsHandlers = [getDummyCustomAttributesSpec];
