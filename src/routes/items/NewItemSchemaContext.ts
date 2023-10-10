import { createContext } from "react";
import { NewItem, NewItemConfig, NewItemSchema } from "./types";
import { CustomAttribute } from "../../types";

export type NewItemSchemaContextType = {
  newItemConfig: NewItemConfig;
  newItemSchema: NewItemSchema;
  setItemAttribute: (
    key: keyof Omit<NewItem, "customAttributeList">,
    value: Omit<NewItem, "customAttributeList">[typeof key],
  ) => void;
  setItemCustomAttribute: (attribute: CustomAttribute) => void;
  setOption: (
    key: keyof NewItemSchema["options"],
    value: NewItemSchema["options"][typeof key],
  ) => void;
};

export const NewItemSchemaContext =
  createContext<NewItemSchemaContextType | null>(null);
