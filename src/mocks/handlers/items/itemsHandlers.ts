import { rest } from "msw";
import { dummyNewItemConfig } from "./dummyNewItemConfig";

const getDummyCustomAttributesSpec = rest.get(
  "/api/stores/:storeId/add-item-config",
  (req, res, ctx) => {
    const { storeId } = req.params;

    if (typeof storeId !== "string") {
      return res(ctx.status(400), ctx.text("Invalid storeId"));
    }

    if (storeId === "1") {
      dummyNewItemConfig.core.scheduleType = "fixed";
    } else if (storeId === "2") {
      dummyNewItemConfig.core.scheduleType = "shortSlots";
    } else if (storeId === "3") {
      dummyNewItemConfig.core.scheduleType = "multiDay";
    } else if (storeId === "4") {
      dummyNewItemConfig.core.scheduleType = "free";
    }

    return res(ctx.status(200), ctx.json(dummyNewItemConfig));
  },
);

export const itemsHandlers = [getDummyCustomAttributesSpec];
