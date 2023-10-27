import { rest } from "msw";
import { fetchData } from "./utils";
import { StoreConfig } from "../types";

const importStoreConfig = async (storeId: string) => {
  return (await fetchData(storeId, "storeConfig")) as StoreConfig;
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

export const storeConfigHandlers = [
  getOwner,
  getMainPageConfig,
  getDetailsPageConfig,
  getItemConfig,
];
