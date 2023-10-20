import { createContext } from "react";
import { NewItem, NewItemConfig, NewItemSchema } from "./types";
import { CustomAttribute } from "../../../types";

export type NewItemSchemaContextType = {
  newItemConfig: NewItemConfig;
  newItemSchema: NewItemSchema;
  setItemAttribute: (
    attr: Partial<Omit<NewItem, "customAttributeList">>,
  ) => void;
  setItemCustomAttribute: (attr: CustomAttribute) => void;
  setOption: (option: Partial<NewItemSchema["options"]>) => void;
};

export const NewItemSchemaContext =
  createContext<NewItemSchemaContextType | null>(null);
