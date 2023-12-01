import { createContext } from "react";
import { CustomAttribute, Item } from "../../../../types";

export type ItemFormContextType = {
  item: Item;
  setItem: (attr: Partial<Item>) => void;
  setItemAttribute: (attr: Partial<Item["attributes"]>) => void;
  setItemCustomAttribute: (attr: CustomAttribute) => void;
  setSubItems: (subItems: Item["subItems"]) => void;
};

export const ItemFormContext = createContext<ItemFormContextType | null>(null);
