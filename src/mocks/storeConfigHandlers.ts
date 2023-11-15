import { rest } from "msw";
import { jwtDecode } from "jwt-decode";
import { fetchData, getToken, incorrectToken } from "./utils";
import { StoreConfig } from "../types";

export const importStoreConfig = async (storeId: string) => {
  try {
    const storeConfig = (await fetchData(storeId, "storeConfig")) as
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
  "/api/store-configs/:storeId",
  async (req, res, ctx) => {
    const { storeId } = req.params;

    const storeConfig = await importStoreConfig(storeId.toString());

    if (!storeConfig) {
      return res(ctx.status(404), ctx.json({ message: "Store not found." }));
    }

    return res(ctx.status(200), ctx.json(storeConfig));
  },
);

const getMainPageConfig = rest.get(
  "/api/store-configs/:storeId/mainPageConfig",
  async (req, res, ctx) => {
    const { storeId } = req.params;

    const storeConfig = await importStoreConfig(storeId.toString());

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
  "/api/store-configs/:storeId/detailsPageConfig",
  async (req, res, ctx) => {
    const { storeId } = req.params;

    const storeConfig = await importStoreConfig(storeId.toString());

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

  const module = await import(/* @vite-ignore */ `./data/common/adminStores`);
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

    const adminStoresModule = await import(
      /* @vite-ignore */ `./data/common/adminStores`
    );
    const { adminStores } = adminStoresModule;

    const decoded = jwtDecode(token) as { email: keyof typeof adminStores };
    body.owner.ownerId = decoded.email;

    adminStores[decoded.email].push({
      storeConfigId: "101",
      name: body.owner.name,
    });

    const storeConfigModule = await import("./data/store-101");
    storeConfigModule.storeConfig.push(body);

    return res(ctx.status(201), ctx.json({ message: "Added store config." }));
  },
);

export const storeConfigHandlers = [
  getStoreConfig,
  getMainPageConfig,
  getDetailsPageConfig,
  getAdminStores,
  addStoreConfig,
];
