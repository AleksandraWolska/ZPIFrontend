import { createContext } from "react";
import { NewItemSchema } from "./types";
import { CustomAttribute } from "../../../types";
import { ItemConfig } from "../types";

export type NewItemSchemaContextType = {
  newItemConfig: ItemConfig;
  newItemSchema: NewItemSchema;
  setItemAttribute: (
    attr: Partial<Omit<NewItemSchema["item"], "customAttributeList">>,
  ) => void;
  setItemCustomAttribute: (attr: CustomAttribute) => void;
  setOption: (option: Partial<NewItemSchema["options"]>) => void;
};

export const NewItemSchemaContext =
  createContext<NewItemSchemaContextType | null>(null);
