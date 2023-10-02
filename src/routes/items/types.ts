// import { ObjectValues } from "../../types";

// export const NEW_ITEM_STEPS = {
//   GENERAL: "GENERAL",
//   CUSTOM_ATTRIBUTES: "CUSTOM_ATTRIBUTES",
//   SCHEDULE: "SCHEDULE",
// } as const;
//
// export type NewItemStep = ObjectValues<typeof NEW_ITEM_STEPS>;

import { Item, StoreConfig } from "../userapp/mocks/types";

export type NewItem = Pick<
  Item,
  | "title"
  | "subtitle"
  | "description"
  | "image"
  | "availableAmount"
  | "subitemList"
  | "customAttributeList"
>;

export type AddItemConfig = Pick<StoreConfig, "core" | "customAttributesSpec">;
