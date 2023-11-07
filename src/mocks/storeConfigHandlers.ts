import { rest } from "msw";
import { jwtDecode } from "jwt-decode";
import { incorrectToken, fetchData, getStoreId, getToken } from "./utils";
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

export const importAdminStoreConfig = async (token: string) => {
  const decoded = jwtDecode(token) as { email: string };
  const storeId = getStoreId(decoded.email);
  return importStoreConfig(storeId);
};

const getStoreConfig = rest.get(
  "/api/stores/:storeId/store-config",
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
  "/api/stores/:storeId/main-page-config",
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
  "/api/stores/:storeId/details-page-config",
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

const getItemConfig = rest.get(
  "/api/stores/:storeId/item-config",
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
      }),
    );
  },
);

const getStoreConfigAdmin = rest.get(
  "/api/admin/store-config",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const storeConfig = await importAdminStoreConfig(token);

    return res(ctx.status(storeConfig ? 200 : 404), ctx.json(storeConfig));
  },
);

const addStoreConfig = rest.post(
  "/api/admin/store-config",
  async (req, res, ctx) => {
    const token = getToken(req.headers);
    if (incorrectToken(token)) {
      return res(ctx.status(401), ctx.json({ message: "Unauthorized." }));
    }

    const body = (await req.json()) as StoreConfig;

    const module = await import("./data/store-101");
    module.storeConfig.push(body);

    return res(ctx.status(201), ctx.json({ message: "Added store config." }));
  },
);

export const storeConfigHandlers = [
  getStoreConfig,
  getMainPageConfig,
  getDetailsPageConfig,
  getItemConfig,
  getStoreConfigAdmin,
  addStoreConfig,
];
