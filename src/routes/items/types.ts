import { Availability, Item, StoreConfig, SubItem } from "../../types";

export type NewItemConfig = Pick<StoreConfig, "core" | "customAttributesSpec">;

export type NewSubItem = Omit<SubItem, "id">;

export type NewSubItemOptions = {
  amount?: number;
  schedule?: Availability;
};

export type NewSubItemSchema = {
  subItem: NewSubItem;
  options: NewSubItemOptions;
};

export type NewItem = Omit<Item, "id" | "subItemList"> & {
  subItemList?: NewSubItemSchema[];
};

export type NewItemOptions = {
  amount?: number;
  schedule?: Availability;
};

export type NewItemSchema = {
  item: NewItem;
  options: NewItemOptions;
};
