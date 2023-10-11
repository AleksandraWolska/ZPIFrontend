import { rest } from "msw";
import { dummyNewItemConfig } from "./dummyNewItemConfig";

const getDummyCustomAttributesSpec = rest.get(
  "/api/stores/:storeId/add-item-config",
  (req, res, ctx) => {
    const { storeId } = req.params;

    if (storeId === "1") {
      dummyNewItemConfig.core.flexibility = false;
      dummyNewItemConfig.core.scheduleType = undefined;
    } else if (storeId === "2") {
      dummyNewItemConfig.core.flexibility = true;
      dummyNewItemConfig.core.scheduleType = "shortSlots";
    } else if (storeId === "3") {
      dummyNewItemConfig.core.flexibility = true;
      dummyNewItemConfig.core.scheduleType = "multiDay";
    }

    return res(ctx.status(200), ctx.json(dummyNewItemConfig));
  },
);

export const itemsHandlers = [getDummyCustomAttributesSpec];
