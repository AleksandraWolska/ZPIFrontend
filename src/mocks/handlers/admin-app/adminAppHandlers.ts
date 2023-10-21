import { rest } from "msw";
import { EnhancedItem } from "../../../routes/admin-app/types";

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

const getEnhancedItems = rest.get(
  "/api/admin/:storeId/enhanced-items",
  async (req, res, ctx) => {
    const { storeId } = req.params;

    if (storeId === "1") {
      const enhancedItems = (await import("./store-1/dummyEnhancedItems"))
        .default;
      return res(ctx.status(200), ctx.json(enhancedItems));
    }
    if (storeId === "2") {
      const enhancedItems = (await import("./store-2/dummyEnhancedItems"))
        .default;
      return res(ctx.status(200), ctx.json(enhancedItems));
    }
    if (storeId === "3") {
      const enhancedItems = (await import("./store-3/dummyEnhancedItems"))
        .default;
      return res(ctx.status(200), ctx.json(enhancedItems));
    }

    return res(ctx.status(404), ctx.json({ message: "Invalid store ID." }));
  },
);

const getEnhancedItemById = rest.get(
  "/api/admin/:storeId/enhanced-items/:itemId",
  async (req, res, ctx) => {
    const { storeId, itemId } = req.params;

    let enhancedItems: EnhancedItem[] = [];

    if (storeId === "1") {
      enhancedItems = (await import("./store-1/dummyEnhancedItems")).default;
    }
    if (storeId === "2") {
      enhancedItems = (await import("./store-2/dummyEnhancedItems")).default;
    }
    if (storeId === "3") {
      enhancedItems = (await import("./store-3/dummyEnhancedItems")).default;
    }

    const item = enhancedItems.find((e) => e.item.id === itemId);
    return item
      ? res(ctx.status(200), ctx.json(item))
      : res(ctx.status(404), ctx.json({ message: "Item not found." }));
  },
);

const addEnhancedItem = rest.post(
  "/api/stores/:storeId/add-enhanced-item",
  async (req, res, ctx) => {
    const { storeId } = req.params;
    const body = (await req.json()) as EnhancedItem;

    if (storeId === "1") {
      const schemas = (await import("./store-1/dummyEnhancedItems")).default;
      schemas.push(body);
      return res(
        ctx.status(200),
        ctx.json({ message: "Added new item schema." }),
      );
    }
    if (storeId === "2") {
      const schemas = (await import("./store-2/dummyEnhancedItems")).default;
      schemas.push(body);
      return res(
        ctx.status(200),
        ctx.json({ message: "Added new item schema." }),
      );
    }
    if (storeId === "3") {
      const schemas = (await import("./store-3/dummyEnhancedItems")).default;
      schemas.push(body);
      return res(
        ctx.status(200),
        ctx.json({ message: "Added new item schema." }),
      );
    }

    return res(ctx.status(404), ctx.json({ message: "Invalid store ID." }));
  },
);

// const enhanceNewItemSchema = (newItemSchema: NewItemSchema): EnhancedItem => {
//   return {
//     item: {
//       ...newItemSchema.item,
//       id: uuid(),
//       subItemList: newItemSchema.item.subItemList?.map((subItemSchema) => {
//         return {
//           subItem: {
//             ...subItemSchema.subItem,
//             id: uuid(),
//           },
//           options: subItemSchema.options,
//         };
//       }),
//     },
//     initialStatus: newItemSchema.options,
//   };
// };

export const adminAppHandlers = [
  getDummyItemConfig,
  getEnhancedItems,
  getEnhancedItemById,
  addEnhancedItem,
];
