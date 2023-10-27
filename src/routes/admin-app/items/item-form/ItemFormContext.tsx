import { createContext } from "react";
import { ItemConfig } from "../../types";
import { CustomAttribute, Item } from "../../../../types";

export type ItemFormContextType = {
  itemConfig: ItemConfig;
  item: Item;
  setItemAttribute: (attr: Partial<Item["attributes"]>) => void;
  setItemCustomAttribute: (attr: CustomAttribute) => void;
  setInitialSetting: (initialSetting: Partial<Item["initialSettings"]>) => void;
  setSubItems: (subItems: Item["subItems"]) => void;
};

export const ItemFormContext = createContext<ItemFormContextType | null>(null);
