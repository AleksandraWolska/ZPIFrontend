import { ItemSchema, SubItemSchema } from "../types";

export type NewSubItemSchema = Omit<SubItemSchema, "subItem"> & {
  subItem: Omit<SubItemSchema["subItem"], "id">;
};

export type NewItemSchema = Omit<ItemSchema, "item"> & {
  item: Omit<ItemSchema["item"], "id" | "subItemList"> & {
    subItemList?: NewSubItemSchema[];
  };
};
