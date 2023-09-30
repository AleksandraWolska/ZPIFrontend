import { NewItem } from "./types";

export const NEW_ITEM_ACTION_TYPES = {
  SET_ATTRIBUTE: "SET_ATTRIBUTE",
} as const;

type SetAttributeAction = {
  type: typeof NEW_ITEM_ACTION_TYPES.SET_ATTRIBUTE;
  payload: Partial<NewItem>;
};

type NewItemAction = SetAttributeAction;

export function newItemReducer(newItem: NewItem, action: NewItemAction) {
  switch (action.type) {
    case NEW_ITEM_ACTION_TYPES.SET_ATTRIBUTE:
      return {
        ...newItem,
        ...action.payload,
      };
    default:
      throw Error("Unknown reducer action!");
  }
}
