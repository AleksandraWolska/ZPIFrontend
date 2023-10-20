import { CustomAttribute } from "../../../types";
import { EditedItem, EditedItemSchema } from "./types";

export const EDITED_ITEM_SCHEMA_ACTION_TYPES = {
  SET_ITEM_ATTRIBUTE: "SET_ITEM_ATTRIBUTE",
  SET_ITEM_CUSTOM_ATTRIBUTE: "SET_ITEM_CUSTOM_ATTRIBUTE",
  SET_OPTION: "SET_OPTION",
} as const;

type SetItemAttributeAction = {
  type: typeof EDITED_ITEM_SCHEMA_ACTION_TYPES.SET_ITEM_ATTRIBUTE;
  payload: Partial<Omit<EditedItem, "customAttributeList">>;
};

type SetItemCustomAttributeAction = {
  type: typeof EDITED_ITEM_SCHEMA_ACTION_TYPES.SET_ITEM_CUSTOM_ATTRIBUTE;
  payload: CustomAttribute;
};

type SetOptionAction = {
  type: typeof EDITED_ITEM_SCHEMA_ACTION_TYPES.SET_OPTION;
  payload: Partial<EditedItemSchema["options"]>;
};

type EditedItemSchemaAction =
  | SetItemAttributeAction
  | SetItemCustomAttributeAction
  | SetOptionAction;

export function editedItemSchemaReducer(
  editedItemSchema: EditedItemSchema,
  action: EditedItemSchemaAction,
): EditedItemSchema {
  switch (action.type) {
    case EDITED_ITEM_SCHEMA_ACTION_TYPES.SET_ITEM_ATTRIBUTE:
      return {
        ...editedItemSchema,
        item: { ...editedItemSchema.item, ...action.payload },
      };
    case EDITED_ITEM_SCHEMA_ACTION_TYPES.SET_ITEM_CUSTOM_ATTRIBUTE:
      return {
        ...editedItemSchema,
        item: {
          ...editedItemSchema.item,
          customAttributeList: editedItemSchema.item.customAttributeList.map(
            (ca) => {
              if (ca.id === action.payload.id) {
                return action.payload;
              }
              return ca;
            },
          ),
        },
      };
    case EDITED_ITEM_SCHEMA_ACTION_TYPES.SET_OPTION:
      return {
        ...editedItemSchema,
        options: { ...editedItemSchema.options, ...action.payload },
      };
    default:
      throw Error("Unknown reducer action!");
  }
}
