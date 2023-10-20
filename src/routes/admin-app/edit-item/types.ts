import { Item, SubItem } from "../../../types";

export type EditedSubItemOptions = {
  amount?: number;
};

export type EditedSubItemSchema = {
  subItem: SubItem;
  options: EditedSubItemOptions;
};

export type EditedItem = Omit<Item, "subItemList"> & {
  subItemList?: EditedSubItemSchema[];
};

export type EditedItemOptions = {
  amount?: number;
};

export type EditedItemSchema = {
  item: EditedItem;
  options: EditedItemOptions;
};
