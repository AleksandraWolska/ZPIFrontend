import { rest } from "msw";
import { v4 as uuid } from "uuid";
import { jwtDecode } from "jwt-decode";
import { incorrectToken, fetchData, getStoreId, getToken } from "./utils";
import { ItemWithoutIds } from "../routes/admin-app/types";
import { ContinuousSchedule, Item, SlotsSchedule } from "../types";
import { importAdminStoreConfig } from "./storeConfigHandlers";
import { calculateAvailability } from "./data/common/availability";

const importItems = async (storeId: string) => {
  return (await fetchData(storeId, "items")) as Item[];
};

const importAdminItems = async (token: string) => {
  const decoded = jwtDecode(token) as { email: string };

  return (await fetchData(getStoreId(decoded.email), "items")) as Item[];
};

const getItems = rest.get(
  "/api/stores/:storeId/items",
  async (req, res, ctx) => {
    const { storeId } = req.params;

    const items = await importItems(storeId.toString());

    return res(ctx.status(200), ctx.json(items));
  },
);

const getItemById = rest.get(
  "/api/stores/:storeId/items/:itemId",
  async (req, res, ctx) => {
    const { storeId, itemId } = req.params;

    const items = await importItems(storeId.toString());

    const item = items.find((i) => i.id === itemId);

    return item
      ? res(ctx.status(200), ctx.json(item))
      : res(ctx.status(404), ctx.json({ message: "Item not found." }));
  },
);

const getItemsAdmin = rest.get("/api/admin/items", async (req, res, ctx) => {
  const token = getToken(req.headers);
  if (incorrectToken(token)) {
    return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
  }

  const items = await importAdminItems(token);

  return res(ctx.status(200), ctx.json(items));
});

const getItemByIdAdmin = rest.get(
  "/api/admin/items/:itemId",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const { itemId } = req.params;

    const items = await importAdminItems(token);

    const item = items.find((i) => i.id === itemId);

    return item
      ? res(ctx.status(200), ctx.json(item))
      : res(ctx.status(404), ctx.json({ message: "Item not found." }));
  },
);

const addItem = rest.post("/api/admin/items", async (req, res, ctx) => {
  const token = getToken(req.headers);
  if (incorrectToken(token)) {
    return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
  }

  const body = (await req.json()) as ItemWithoutIds;

  const items = await importAdminItems(token);
  const storeConfig = await importAdminStoreConfig(token);

  let item = addIdsToItem(body);

  if (storeConfig.core.flexibility) {
    item = addAvailabilityToItem(item);
  }

  items.push(item);

  return res(ctx.status(201), ctx.json({ message: "Added new item." }));
});

const editItem = rest.put("/api/admin/items/:itemId", async (req, res, ctx) => {
  const token = getToken(req.headers);
  if (incorrectToken(token)) {
    return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
  }

  const { itemId } = req.params;
  const body = (await req.json()) as Item;

  const items = await importAdminItems(token);

  const idx = items.findIndex((i) => i.id === itemId);

  if (idx === -1) {
    return res(ctx.status(404), ctx.json({ message: "Item not found." }));
  }

  const storeConfig = await importAdminStoreConfig(token);
  if (storeConfig.core.flexibility) {
    body.status.availability = calculateAvailability(
      body.initialSettings.schedule as SlotsSchedule | ContinuousSchedule,
    );
  }

  items[idx] = body;

  return res(ctx.status(200), ctx.json({ message: "Edited item." }));
});

const deleteItem = rest.delete(
  "/api/admin/items/:itemId",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const { itemId } = req.params;

    const items = await importAdminItems(token);

    const idx = items.findIndex((i) => i.id === itemId);

    items.splice(idx, 1);

    return idx !== -1
      ? res(ctx.status(200), ctx.json({ message: "Item deleted." }))
      : res(ctx.status(404), ctx.json({ message: "Item not found." }));
  },
);

const activateItem = rest.put(
  "/api/admin/items/:itemId/activate",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const { itemId } = req.params;

    const items = await importAdminItems(token);

    const idx = items.findIndex((i) => i.id === itemId);

    if (idx === -1) {
      return res(ctx.status(404), ctx.json({ message: "Item not found." }));
    }

    items[idx].status.active = true;

    return res(ctx.status(200), ctx.json({ message: "Item activated." }));
  },
);

const deactivateItem = rest.put(
  "/api/admin/items/:itemId/deactivate",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const { itemId } = req.params;

    const items = await importAdminItems(token);

    const idx = items.findIndex((i) => i.id === itemId);

    if (idx === -1) {
      return res(ctx.status(404), ctx.json({ message: "Item not found." }));
    }

    items[idx].status.active = false;

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
    status: {
      ...item.status,
      availability: calculateAvailability(
        item.initialSettings.schedule as SlotsSchedule | ContinuousSchedule,
      ),
    },
  };
};

export const itemsHandlers = [
  getItems,
  getItemById,
  getItemsAdmin,
  getItemByIdAdmin,
  addItem,
  editItem,
  deleteItem,
  activateItem,
  deactivateItem,
];
