import { createContext } from "react";
import { CustomAttribute } from "../../../types";
import { EnhancedItem } from "../types";

export type EditItemContextType = {
  enhancedItem: EnhancedItem;
  setItemAttribute: (
    attr: Partial<Omit<EnhancedItem["item"], "customAttributeList">>,
  ) => void;
  setItemCustomAttribute: (attr: CustomAttribute) => void;
  setInitialStatus: (
    initialStatus: Partial<EnhancedItem["initialStatus"]>,
  ) => void;
};

export const EditItemContext = createContext<EditItemContextType | null>(null);
