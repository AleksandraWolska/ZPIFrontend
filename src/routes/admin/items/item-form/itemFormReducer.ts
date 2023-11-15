import { CustomAttribute, Item } from "../../../../types";

export const ITEM_FORM_ACTION_TYPES = {
  SET_ITEM_ATTRIBUTE: "SET_ITEM_ATTRIBUTE",
  SET_ITEM_CUSTOM_ATTRIBUTE: "SET_ITEM_CUSTOM_ATTRIBUTE",
  SET_INITIAL_SETTING: "SET_INITIAL_SETTING",
  SET_SUB_ITEMS: "SET_SUB_ITEMS",
} as const;

type SetItemAttributeAction = {
  type: typeof ITEM_FORM_ACTION_TYPES.SET_ITEM_ATTRIBUTE;
  payload: Partial<Item["attributes"]>;
};

type SetItemCustomAttributeAction = {
  type: typeof ITEM_FORM_ACTION_TYPES.SET_ITEM_CUSTOM_ATTRIBUTE;
  payload: CustomAttribute;
};

type SetInitialSettingAction = {
  type: typeof ITEM_FORM_ACTION_TYPES.SET_INITIAL_SETTING;
  payload: Partial<Item["initialSettings"]>;
};

type SetSubItemsAction = {
  type: typeof ITEM_FORM_ACTION_TYPES.SET_SUB_ITEMS;
  payload: Item["subItems"];
};

type ItemAction =
  | SetItemAttributeAction
  | SetItemCustomAttributeAction
  | SetInitialSettingAction
  | SetSubItemsAction;

export function itemFormReducer(item: Item, action: ItemAction): Item {
  switch (action.type) {
    case ITEM_FORM_ACTION_TYPES.SET_ITEM_ATTRIBUTE:
      return {
        ...item,
        attributes: { ...item.attributes, ...action.payload },
      };
    case ITEM_FORM_ACTION_TYPES.SET_ITEM_CUSTOM_ATTRIBUTE:
      return {
        ...item,
        customAttributeList: item.customAttributeList.map((ca) => {
          if (ca.id === action.payload.id) {
            return action.payload;
          }
          return ca;
        }),
      };
    case ITEM_FORM_ACTION_TYPES.SET_INITIAL_SETTING:
      return {
        ...item,
        initialSettings: { ...item.initialSettings, ...action.payload },
      };
    case ITEM_FORM_ACTION_TYPES.SET_SUB_ITEMS:
      return {
        ...item,
        subItems: action.payload,
      };
    default:
      throw Error("Unknown reducer action!");
  }
}
