import { createContext } from "react";
import { CustomAttribute } from "../../../types";
import { EnhancedItem, ItemConfig } from "../types";

export type NewItemContextType = {
  itemConfig: ItemConfig;
  enhancedItem: EnhancedItem;
  setItemAttribute: (
    attr: Partial<Omit<EnhancedItem["item"], "customAttributeList">>,
  ) => void;
  setItemCustomAttribute: (attr: CustomAttribute) => void;
  setInitialStatus: (option: Partial<EnhancedItem["initialStatus"]>) => void;
};

export const NewItemContext = createContext<NewItemContextType | null>(null);
