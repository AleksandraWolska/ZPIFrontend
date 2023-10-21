import { EnhancedItem } from "../types";
import { CustomAttribute } from "../../../types";

export const ENHANCED_ITEM_ACTION_TYPES = {
  SET_ITEM_ATTRIBUTE: "SET_ITEM_ATTRIBUTE",
  SET_ITEM_CUSTOM_ATTRIBUTE: "SET_ITEM_CUSTOM_ATTRIBUTE",
  SET_INITIAL_STATUS: "SET_INITIAL_STATUS",
} as const;

type SetItemAttributeAction = {
  type: typeof ENHANCED_ITEM_ACTION_TYPES.SET_ITEM_ATTRIBUTE;
  payload: Partial<Omit<EnhancedItem["item"], "customAttributeList">>;
};

type SetItemCustomAttributeAction = {
  type: typeof ENHANCED_ITEM_ACTION_TYPES.SET_ITEM_CUSTOM_ATTRIBUTE;
  payload: CustomAttribute;
};

type SetInitialStatusAction = {
  type: typeof ENHANCED_ITEM_ACTION_TYPES.SET_INITIAL_STATUS;
  payload: Partial<EnhancedItem["initialStatus"]>;
};

type EnhancedItemAction =
  | SetItemAttributeAction
  | SetItemCustomAttributeAction
  | SetInitialStatusAction;

export function enhancedItemReducer(
  enhancedItem: EnhancedItem,
  action: EnhancedItemAction,
): EnhancedItem {
  switch (action.type) {
    case ENHANCED_ITEM_ACTION_TYPES.SET_ITEM_ATTRIBUTE:
      return {
        ...enhancedItem,
        item: { ...enhancedItem.item, ...action.payload },
      };
    case ENHANCED_ITEM_ACTION_TYPES.SET_ITEM_CUSTOM_ATTRIBUTE:
      return {
        ...enhancedItem,
        item: {
          ...enhancedItem.item,
          customAttributeList: enhancedItem.item.customAttributeList.map(
            (ca) => {
              if (ca.id === action.payload.id) {
                return action.payload;
              }
              return ca;
            },
          ),
        },
      };
    case ENHANCED_ITEM_ACTION_TYPES.SET_INITIAL_STATUS:
      return {
        ...enhancedItem,
        initialStatus: { ...enhancedItem.initialStatus, ...action.payload },
      };
    default:
      throw Error("Unknown reducer action!");
  }
}
