import { createContext } from "react";
import { CustomAttribute } from "../../../types";
import { ItemSchema, ItemConfig } from "../types";

export type EditedItemSchemaContextType = {
  itemConfig: ItemConfig;
  editedItemSchema: ItemSchema;
  setItemAttribute: (
    attr: Partial<Omit<ItemSchema["item"], "customAttributeList">>,
  ) => void;
  setItemCustomAttribute: (attr: CustomAttribute) => void;
  setOption: (option: Partial<ItemSchema["options"]>) => void;
};

export const EditedItemSchemaContext =
  createContext<EditedItemSchemaContextType | null>(null);
