import { createContext } from "react";
import { EnhancedItem, ItemConfig } from "../types";
import { CustomAttribute } from "../../../types";

export type EnhancedItemContextType = {
  itemConfig: ItemConfig;
  enhancedItem: EnhancedItem;
  setItemAttribute: (
    attr: Partial<Omit<EnhancedItem["item"], "customAttributeList">>,
  ) => void;
  setItemCustomAttribute: (attr: CustomAttribute) => void;
  setInitialStatus: (
    initialStatus: Partial<EnhancedItem["initialStatus"]>,
  ) => void;
};

export const EnhancedItemContext =
  createContext<EnhancedItemContextType | null>(null);
