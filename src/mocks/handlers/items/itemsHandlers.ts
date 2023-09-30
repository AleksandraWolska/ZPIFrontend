import { rest } from "msw";
import { dummyCustomAttributesSpec } from "./dummyCustomAttributesSpec";

const getDummyCustomAttributesSpec = rest.get(
  "/api/stores/:storeId/custom-attributes-spec",
  (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummyCustomAttributesSpec));
  },
);

export const itemsHandlers = [getDummyCustomAttributesSpec];
