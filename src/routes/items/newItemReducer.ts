import { NewItem } from "./types";
import { CustomAttribute } from "../userapp/mocks/types";

export const NEW_ITEM_ACTION_TYPES = {
  SET_ATTRIBUTE: "SET_ATTRIBUTE",
  SET_CUSTOM_ATTRIBUTE: "SET_CUSTOM_ATTRIBUTE",
} as const;

type SetAttributeAction = {
  type: typeof NEW_ITEM_ACTION_TYPES.SET_ATTRIBUTE;
  payload: Partial<NewItem>;
};

type SetCustomAttributeAction = {
  type: typeof NEW_ITEM_ACTION_TYPES.SET_CUSTOM_ATTRIBUTE;
  payload: CustomAttribute;
};

type NewItemAction = SetAttributeAction | SetCustomAttributeAction;

export function newItemReducer(newItem: NewItem, action: NewItemAction) {
  switch (action.type) {
    case NEW_ITEM_ACTION_TYPES.SET_ATTRIBUTE:
      return {
        ...newItem,
        ...action.payload,
      };
    case NEW_ITEM_ACTION_TYPES.SET_CUSTOM_ATTRIBUTE:
      return {
        ...newItem,
        customAttributeList: newItem.customAttributeList?.map((attr) => {
          if (attr.name === action.payload.name) {
            return action.payload;
          }
          return attr;
        }),
      };
    default:
      throw Error("Unknown reducer action!");
  }
}
