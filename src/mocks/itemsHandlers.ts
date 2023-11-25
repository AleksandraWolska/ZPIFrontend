import { rest } from "msw";
import { v4 as uuid } from "uuid";
import {
  incorrectToken,
  fetchData,
  getToken,
  getStoreMockIdByStoreName,
} from "./utils";
import { ItemWithoutIds } from "../routes/admin/types";
import { ContinuousSchedule, Item, SlotsSchedule } from "../types";
import { calculateAvailability } from "./data/common/availability";
import { importStoreConfig } from "./storeConfigHandlers";

export const importItems = async (storeName: string) => {
  const mockId = await getStoreMockIdByStoreName(storeName);

  try {
    return (await fetchData(mockId, "items")) as Item[];
  } catch {
    return null;
  }
};

const getItems = rest.get(
  "/api/stores/:storeName/items",
  async (req, res, ctx) => {
    const { storeName } = req.params;

    const items = await importItems(storeName.toString());

    if (!items) {
      return res(ctx.status(404), ctx.json({ message: "Store not found." }));
    }

    return res(ctx.status(200), ctx.json(items));
  },
);

const getItemById = rest.get(
  "/api/stores/:storeName/items/:itemId",
  async (req, res, ctx) => {
    const { storeName, itemId } = req.params;

    const items = await importItems(storeName.toString());

    if (!items) {
      return res(ctx.status(404), ctx.json({ message: "Store not found." }));
    }

    const item = items.find((i) => i.id === itemId);

    return item
      ? res(ctx.status(200), ctx.json(item))
      : res(ctx.status(404), ctx.json({ message: "Item not found." }));
  },
);

const addItem = rest.post(
  "/api/stores/:storeName/items",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const { storeName } = req.params;

    const body = (await req.json()) as ItemWithoutIds;

    const items = await importItems(storeName.toString());
    const storeConfig = await importStoreConfig(storeName.toString());

    if (!items || !storeConfig) {
      return res(ctx.status(404), ctx.json({ message: "Store not found." }));
    }

    let item = addIdsToItem(body);

    if (storeConfig.core.flexibility) {
      item = addAvailabilityToItem(item);
    }

    items.push(item);

    return res(ctx.status(201), ctx.json({ message: "Added new item." }));
  },
);

const editItem = rest.put(
  "/api/stores/:storeName/items/:itemId",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const { storeName, itemId } = req.params;
    const body = (await req.json()) as Item;

    const items = await importItems(storeName.toString());

    const storeConfig = await importStoreConfig(storeName.toString());

    if (!items || !storeConfig) {
      return res(ctx.status(404), ctx.json({ message: "Store not found." }));
    }

    const idx = items.findIndex((i) => i.id === itemId);

    if (idx === -1) {
      return res(ctx.status(404), ctx.json({ message: "Item not found." }));
    }

    if (storeConfig.core.flexibility) {
      body.availability = calculateAvailability(
        body.schedule as SlotsSchedule | ContinuousSchedule,
      );
    }

    items[idx] = body;

    return res(ctx.status(200), ctx.json({ message: "Edited item." }));
  },
);

const deleteItem = rest.delete(
  "/api/stores/:storeName/items/:itemId",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const { storeName, itemId } = req.params;

    const items = await importItems(storeName.toString());

    if (!items) {
      return res(ctx.status(404), ctx.json({ message: "Store not found." }));
    }

    const idx = items.findIndex((i) => i.id === itemId);

    items.splice(idx, 1);

    return idx !== -1
      ? res(ctx.status(200), ctx.json({ message: "Item deleted." }))
      : res(ctx.status(404), ctx.json({ message: "Item not found." }));
  },
);

const activateItem = rest.put(
  "/api/stores/:storeName/items/:itemId/activate",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const { storeName, itemId } = req.params;

    const items = await importItems(storeName.toString());

    if (!items) {
      return res(ctx.status(404), ctx.json({ message: "Store not found." }));
    }

    const idx = items.findIndex((i) => i.id === itemId);

    if (idx === -1) {
      return res(ctx.status(404), ctx.json({ message: "Item not found." }));
    }

    items[idx].active = true;

    return res(ctx.status(200), ctx.json({ message: "Item activated." }));
  },
);

const deactivateItem = rest.put(
  "/api/stores/:storeName/items/:itemId/deactivate",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const { storeName, itemId } = req.params;

    const items = await importItems(storeName.toString());

    if (!items) {
      return res(ctx.status(404), ctx.json({ message: "Store not found." }));
    }

    const idx = items.findIndex((i) => i.id === itemId);

    if (idx === -1) {
      return res(ctx.status(404), ctx.json({ message: "Item not found." }));
    }

    items[idx].active = false;

    return res(ctx.status(200), ctx.json({ message: "Item deactivated." }));
  },
);

const addIdsToItem = (item: ItemWithoutIds): Item => {
  return {
    ...item,
    id: uuid(),
    subItems: item.subItems?.map((si) => ({
      ...si,
      id: uuid(),
    })),
  };
};

const addAvailabilityToItem = (item: Item): Item => {
  return {
    ...item,
    availability: calculateAvailability(
      item.schedule as SlotsSchedule | ContinuousSchedule,
    ),
  };
};

export const itemsHandlers = [
  getItems,
  getItemById,
  addItem,
  editItem,
  deleteItem,
  activateItem,
  deactivateItem,
];
