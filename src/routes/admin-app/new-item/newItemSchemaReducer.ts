import { NewItem, NewItemSchema } from "./types";
import { CustomAttribute } from "../../../types";

export const NEW_ITEM_SCHEMA_ACTION_TYPES = {
  SET_ITEM_ATTRIBUTE: "SET_ITEM_ATTRIBUTE",
  SET_ITEM_CUSTOM_ATTRIBUTE: "SET_ITEM_CUSTOM_ATTRIBUTE",
  SET_OPTION: "SET_OPTION",
} as const;

type SetItemAttributeAction = {
  type: typeof NEW_ITEM_SCHEMA_ACTION_TYPES.SET_ITEM_ATTRIBUTE;
  payload: Partial<Omit<NewItem, "customAttributeList">>;
};

type SetItemCustomAttributeAction = {
  type: typeof NEW_ITEM_SCHEMA_ACTION_TYPES.SET_ITEM_CUSTOM_ATTRIBUTE;
  payload: CustomAttribute;
};

type SetOptionAction = {
  type: typeof NEW_ITEM_SCHEMA_ACTION_TYPES.SET_OPTION;
  payload: Partial<NewItemSchema["options"]>;
};

type NewItemSchemaAction =
  | SetItemAttributeAction
  | SetItemCustomAttributeAction
  | SetOptionAction;

export function newItemSchemaReducer(
  newItemSchema: NewItemSchema,
  action: NewItemSchemaAction,
) {
  switch (action.type) {
    case NEW_ITEM_SCHEMA_ACTION_TYPES.SET_ITEM_ATTRIBUTE:
      return {
        ...newItemSchema,
        item: { ...newItemSchema.item, ...action.payload },
      };
    case NEW_ITEM_SCHEMA_ACTION_TYPES.SET_ITEM_CUSTOM_ATTRIBUTE:
      return {
        ...newItemSchema,
        item: {
          ...newItemSchema.item,
          customAttributeList: newItemSchema.item.customAttributeList.map(
            (ca) => {
              if (ca.id === action.payload.id) {
                return action.payload;
              }
              return ca;
            },
          ),
        },
      };
    case NEW_ITEM_SCHEMA_ACTION_TYPES.SET_OPTION:
      return {
        ...newItemSchema,
        options: { ...newItemSchema.options, ...action.payload },
      };
    default:
      throw Error("Unknown reducer action!");
  }
}
