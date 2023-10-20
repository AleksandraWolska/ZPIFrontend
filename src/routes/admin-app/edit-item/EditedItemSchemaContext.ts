import { createContext } from "react";
import { NewItemConfig } from "../new-item/types";
import { CustomAttribute } from "../../../types";
import { EditedItem, EditedItemSchema } from "./types";

export type EditedItemSchemaContextType = {
  itemConfig: NewItemConfig;
  editedItemSchema: EditedItemSchema;
  setItemAttribute: (
    attr: Partial<Omit<EditedItem, "customAttributeList">>,
  ) => void;
  setItemCustomAttribute: (attr: CustomAttribute) => void;
  setOption: (option: Partial<EditedItemSchema["options"]>) => void;
};

export const EditedItemSchemaContext =
  createContext<EditedItemSchemaContextType | null>(null);
