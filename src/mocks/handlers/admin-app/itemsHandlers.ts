import { rest } from "msw";
import { v4 as uuid } from "uuid";
import {
  NewItem,
  NewItemSchema,
} from "../../../routes/admin-app/new-item/types";
import { Item } from "../../../types";

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

const addItem = rest.post(
  "/api/stores/:storeId/add-item",
  async (req, res, ctx) => {
    const { storeId } = req.params;
    const body = (await req.json()) as NewItemSchema;

    if (storeId === "1") {
      const items = (await import("./store-1/dummyItems")).default;
      console.log("length before push", items.length);
      items.push(enhanceNewItem(body.item));
      return res(ctx.status(200), ctx.json({ message: "Added new item." }));
    }
    if (storeId === "2") {
      const items = (await import("./store-2/dummyItems")).default;
      items.push(enhanceNewItem(body.item));
      return res(ctx.status(200), ctx.json({ message: "Added new item." }));
    }
    if (storeId === "3") {
      const items = (await import("./store-3/dummyItems")).default;
      items.push(enhanceNewItem(body.item));
      return res(ctx.status(200), ctx.json({ message: "Added new item." }));
    }

    return res(ctx.status(404), ctx.json({ message: "Invalid store ID." }));
  },
);

const enhanceNewItem = (newItem: NewItem): Item => {
  return {
    ...newItem,
    id: uuid(),
    subItemList: newItem.subItemList?.map((subItemSchema) => {
      return {
        ...subItemSchema.subItem,
        id: uuid(),
      };
    }),
  };
};

export const itemsHandlers = [getDummyNewItemConfig, addItem];
