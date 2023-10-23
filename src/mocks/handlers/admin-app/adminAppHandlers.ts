import { rest } from "msw";
import { v4 as uuid } from "uuid";
import { EnhancedItem } from "../../../routes/admin-app/types";
import { EnhancedItemWithoutIds } from "../../../routes/admin-app/items/add-item/useAddItem";

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

    return res(ctx.status(200), ctx.json(enhancedItems));
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
  "/api/stores/:storeId/enhanced-items",
  async (req, res, ctx) => {
    const { storeId } = req.params;
    const body = (await req.json()) as EnhancedItem;

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

    enhancedItems.push(addIdsToEnhancedItem(body));

    return res(
      ctx.status(200),
      ctx.json({ message: "Added new item schema." }),
    );
  },
);

const editEnhancedItem = rest.put(
  "/api/stores/:storeId/enhanced-items/:itemId",
  async (req, res, ctx) => {
    const { storeId, itemId } = req.params;
    const body = (await req.json()) as EnhancedItem;

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

    const idx = enhancedItems.findIndex((e) => e.item.id === itemId);
    if (idx === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: "Enhanced item not found." }),
      );
    }

    enhancedItems[idx] = body;
    return res(ctx.status(200), ctx.json({ message: "Edited enhanced item." }));
  },
);

const deleteEnhancedItem = rest.delete(
  "/api/stores/:storeId/enhanced-items/:itemId",
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

    const idx = enhancedItems.findIndex((e) => e.item.id === itemId);
    enhancedItems.splice(idx, 1);

    return idx
      ? res(ctx.status(200), ctx.json({ message: "Item deleted." }))
      : res(ctx.status(404), ctx.json({ message: "Item not found." }));
  },
);

const activateItem = rest.put(
  "/api/admin/:storeId/enhanced-items/:itemId/activate",
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

    const idx = enhancedItems.findIndex((e) => e.item.id === itemId);
    if (idx === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: "Enhanced item not found." }),
      );
    }

    enhancedItems[idx].item.active = true;
    return res(ctx.status(200), ctx.json({ message: "Item activated." }));
  },
);

const deactivateItem = rest.put(
  "/api/admin/:storeId/enhanced-items/:itemId/deactivate",
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

    const idx = enhancedItems.findIndex((e) => e.item.id === itemId);
    if (idx === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: "Enhanced item not found." }),
      );
    }

    enhancedItems[idx].item.active = false;
    return res(ctx.status(200), ctx.json({ message: "Item deactivated." }));
  },
);

const addIdsToEnhancedItem = (
  enhancedItem: EnhancedItemWithoutIds,
): EnhancedItem => {
  return {
    item: {
      ...enhancedItem.item,
      id: uuid(),
      subItemList: enhancedItem.item.subItemList?.map((subItemSchema) => {
        return {
          subItem: {
            ...subItemSchema.subItem,
            id: uuid(),
          },
          initialStatus: subItemSchema.initialStatus,
        };
      }),
    },
    initialStatus: enhancedItem.initialStatus,
  };
};

export const adminAppHandlers = [
  getDummyItemConfig,
  getEnhancedItems,
  getEnhancedItemById,
  addEnhancedItem,
  editEnhancedItem,
  deleteEnhancedItem,
  activateItem,
  deactivateItem,
];
