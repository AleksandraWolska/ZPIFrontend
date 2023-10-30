import { rest } from "msw";
import { jwtDecode } from "jwt-decode";
import { incorrectToken, fetchData, getStoreId, getToken } from "./utils";
import { StoreConfig } from "../types";

export const importStoreConfig = async (storeId: string) => {
  return (await fetchData(storeId, "storeConfig")) as StoreConfig;
};

export const importAdminStoreConfig = async (token: string) => {
  const decoded = jwtDecode(token) as { email: string };

  return (await fetchData(
    getStoreId(decoded.email),
    "storeConfig",
  )) as StoreConfig;
};

const getOwner = rest.get(
  "/api/stores/:storeId/owner",
  async (req, res, ctx) => {
    const { storeId } = req.params;

    const storeConfig = await importStoreConfig(storeId.toString());

    return res(ctx.status(200), ctx.json(storeConfig.owner));
  },
);

const getMainPageConfig = rest.get(
  "/api/stores/:storeId/main-page-config",
  async (req, res, ctx) => {
    const { storeId } = req.params;

    const storeConfig = await importStoreConfig(storeId.toString());

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

    return res(ctx.status(200), ctx.json(storeConfig));
  },
);

export const storeConfigHandlers = [
  getOwner,
  getMainPageConfig,
  getDetailsPageConfig,
  getItemConfig,
  getStoreConfigAdmin,
];
