import { Item, StoreConfig } from "../../types";

export type NewItem = Pick<
  Item,
  | "title"
  | "subtitle"
  | "description"
  | "image"
  | "availableAmount"
  | "subItemList"
  | "customAttributeList"
  | "date"
>;

export type AddItemConfig = Pick<StoreConfig, "core" | "customAttributesSpec">;
