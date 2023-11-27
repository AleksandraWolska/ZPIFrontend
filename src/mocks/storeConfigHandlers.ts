import { rest } from "msw";
import { jwtDecode } from "jwt-decode";
import {
  fetchData,
  getStoreMockIdByStoreName,
  getToken,
  incorrectToken,
} from "./utils";
import { StoreConfig } from "../types";

export const importStoreConfig = async (storeName: string) => {
  const mockId = await getStoreMockIdByStoreName(storeName);

  try {
    const storeConfig = (await fetchData(mockId, "storeConfig")) as
      | StoreConfig
      | StoreConfig[];

    if (Array.isArray(storeConfig)) {
      return storeConfig.length > 0 ? storeConfig[0] : null;
    }

    return storeConfig;
  } catch {
    return null;
  }
};

const getStoreConfig = rest.get(
  "/api/store-configs/:storeName",
  async (req, res, ctx) => {
    const { storeName } = req.params;

    const storeConfig = await importStoreConfig(storeName.toString());

    if (!storeConfig) {
      return res(ctx.status(404), ctx.json({ message: "Store not found." }));
    }

    return res(ctx.status(200), ctx.json(storeConfig));
  },
);

const getMainPageConfig = rest.get(
  "/api/store-configs/:storeName/mainPageConfig",
  async (req, res, ctx) => {
    const { storeName } = req.params;

    const storeConfig = await importStoreConfig(storeName.toString());

    if (!storeConfig) {
      return res(ctx.status(404), ctx.json({ message: "Store not found." }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        customAttributesSpec: storeConfig.customAttributesSpec,
        mainPage: storeConfig.mainPage,
      }),
    );
  },
);

const getDetailsPageConfig = rest.get(
  "/api/store-configs/:storeName/detailsPageConfig",
  async (req, res, ctx) => {
    const { storeName } = req.params;

    const storeConfig = await importStoreConfig(storeName.toString());

    if (!storeConfig) {
      return res(ctx.status(404), ctx.json({ message: "Store not found." }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        core: storeConfig.core,
        customAttributesSpec: storeConfig.customAttributesSpec,
        detailsPage: storeConfig.detailsPage,
      }),
    );
  },
);

const getAdminStores = rest.get("/api/store-configs", async (req, res, ctx) => {
  const token = getToken(req.headers);
  if (incorrectToken(token)) {
    return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
  }

  const module = await import(`./data/common/adminStores`);
  const { adminStores } = module;

  const decoded = jwtDecode(token) as { email: string };
  const { email } = decoded as { email: keyof typeof adminStores };

  return res(ctx.status(200), ctx.json(adminStores[email]));
});

const addStoreConfig = rest.post(
  "/api/store-configs",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const body = (await req.json()) as StoreConfig;

    const adminStoresModule = await import(`./data/common/adminStores`);
    const { adminStores } = adminStoresModule;

    const decoded = jwtDecode(token) as { email: keyof typeof adminStores };
    body.owner.ownerId = decoded.email;

    if (!adminStores[decoded.email]) {
      adminStores[decoded.email] = [];
    }

    adminStores[decoded.email].push({
      mockId: "101",
      storeConfigId: body.owner.name.toLowerCase().trim().replace(/\s+/g, "_"),
      name: body.owner.name,
    });

    const storeConfigModule = await import("./data/store-101");
    storeConfigModule.storeConfig.push(body);

    return res(ctx.status(201), ctx.json({ message: "Added store config." }));
  },
);

const editStoreConfig = rest.put(
  "/api/store-configs/:storeName",
  async (req, res, ctx) => {
    const { storeName } = req.params;

    const storeConfig = await importStoreConfig(storeName.toString());

    if (!storeConfig) {
      return res(ctx.status(404), ctx.json({ message: "Store not found." }));
    }

    const body = (await req.json()) as Omit<StoreConfig, "core">;

    Object.assign(storeConfig, { ...storeConfig, ...body });

    console.log("storeConfig", storeConfig, body);

    return res(ctx.status(200), ctx.json({ message: "Edited store config." }));
  },
);

const nameCheck = rest.get(
  "/api/store-configs/nameCheck",
  async (req, res, ctx) => {
    const url = new URL(req.url);

    const name = url.searchParams.get("name");
    console.log("name", name);

    const adminStoresModule = await import(`./data/common/adminStores`);
    const { adminStores } = adminStoresModule;

    const nameTaken = Object.values(adminStores).some((stores) =>
      stores.some((s) => s.name.toLowerCase() === name?.toLowerCase()),
    );

    return res(ctx.status(200), ctx.json(!nameTaken));
  },
);

export const storeConfigHandlers = [
  nameCheck,
  getStoreConfig,
  getMainPageConfig,
  getDetailsPageConfig,
  getAdminStores,
  addStoreConfig,
  editStoreConfig,
];
