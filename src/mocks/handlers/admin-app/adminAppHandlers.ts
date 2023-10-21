import { rest } from "msw";
import { v4 as uuid } from "uuid";
import { NewItemSchema } from "../../../routes/admin-app/new-item/types";
import { ItemSchema } from "../../../routes/admin-app/types";

const getDummyItemConfig = rest.get(
  "/api/stores/:storeId/item-config",
  async (req, res, ctx) => {
    const { storeId } = req.params;

    if (storeId === "1") {
      const config = (await import("./store-1/dummyItemConfig")).default;
      return res(ctx.status(200), ctx.json(config));
    }
    if (storeId === "2") {
      const config = (await import("./store-2/dummyItemConfig")).default;
      return res(ctx.status(200), ctx.json(config));
    }

    const config = (await import("./store-3/dummyItemConfig")).default;
    return res(ctx.status(200), ctx.json(config));
  },
);

const getItemSchemas = rest.get(
  "/api/admin/:storeId/item-schemas",
  async (req, res, ctx) => {
    const { storeId } = req.params;

    if (storeId === "1") {
      const schemas = (await import("./store-1/dummyItemSchemas")).default;
      return res(ctx.status(200), ctx.json(schemas));
    }
    if (storeId === "2") {
      const schemas = (await import("./store-2/dummyItemSchemas")).default;
      return res(ctx.status(200), ctx.json(schemas));
    }
    if (storeId === "3") {
      const schemas = (await import("./store-3/dummyItemSchemas")).default;
      return res(ctx.status(200), ctx.json(schemas));
    }

    return res(ctx.status(404), ctx.json({ message: "Invalid store ID." }));
  },
);

const getSchemaByItemId = rest.get(
  "/api/admin/:storeId/item-schemas/:itemId",
  async (req, res, ctx) => {
    const { storeId, itemId } = req.params;

    let schemas: ItemSchema[] = [];

    if (storeId === "1") {
      schemas = (await import("./store-1/dummyItemSchemas")).default;
    }
    if (storeId === "2") {
      schemas = (await import("./store-2/dummyItemSchemas")).default;
    }
    if (storeId === "3") {
      schemas = (await import("./store-3/dummyItemSchemas")).default;
    }

    const item = schemas.find((s) => s.item.id === itemId);
    return item
      ? res(ctx.status(200), ctx.json(item))
      : res(ctx.status(404), ctx.json({ message: "Item not found." }));
  },
);

const addItemSchema = rest.post(
  "/api/stores/:storeId/add-item-schema",
  async (req, res, ctx) => {
    const { storeId } = req.params;
    const body = (await req.json()) as NewItemSchema;

    if (storeId === "1") {
      const schemas = (await import("./store-1/dummyItemSchemas")).default;
      schemas.push(enhanceNewItemSchema(body));
      return res(
        ctx.status(200),
        ctx.json({ message: "Added new item schema." }),
      );
    }
    if (storeId === "2") {
      const schemas = (await import("./store-2/dummyItemSchemas")).default;
      schemas.push(enhanceNewItemSchema(body));
      return res(
        ctx.status(200),
        ctx.json({ message: "Added new item schema." }),
      );
    }
    if (storeId === "3") {
      const schemas = (await import("./store-3/dummyItemSchemas")).default;
      schemas.push(enhanceNewItemSchema(body));
      return res(
        ctx.status(200),
        ctx.json({ message: "Added new item schema." }),
      );
    }

    return res(ctx.status(404), ctx.json({ message: "Invalid store ID." }));
  },
);

const enhanceNewItemSchema = (newItemSchema: NewItemSchema): ItemSchema => {
  return {
    item: {
      ...newItemSchema.item,
      id: uuid(),
      subItemList: newItemSchema.item.subItemList?.map((subItemSchema) => {
        return {
          subItem: {
            ...subItemSchema.subItem,
            id: uuid(),
          },
          options: subItemSchema.options,
        };
      }),
    },
    options: newItemSchema.options,
  };
};

export const adminAppHandlers = [
  getDummyItemConfig,
  getItemSchemas,
  getSchemaByItemId,
  addItemSchema,
];
