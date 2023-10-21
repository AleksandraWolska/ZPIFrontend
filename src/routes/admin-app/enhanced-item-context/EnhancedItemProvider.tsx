import { ReactNode, useContext, useMemo, useReducer } from "react";
import useItemConfig from "../common-data/useItemConfig";
import {
  ENHANCED_ITEM_ACTION_TYPES,
  enhancedItemReducer,
} from "./enhancedItemReducer";
import { EnhancedItem } from "../types";
import { CustomAttribute } from "../../../types";
import {
  EnhancedItemContext,
  EnhancedItemContextType,
} from "./EnhancedItemContext";

function EnhancedItemProvider({
  children,
  initialEnhancedItem,
}: {
  children: ReactNode;
  initialEnhancedItem: EnhancedItem;
}) {
  const itemConfig = useItemConfig();

  const [enhancedItem, dispatch] = useReducer(
    enhancedItemReducer,
    initialEnhancedItem,
  );

  const setItemAttribute = (
    attr: Partial<Omit<EnhancedItem["item"], "customAttributeList">>,
  ) => {
    dispatch({
      type: ENHANCED_ITEM_ACTION_TYPES.SET_ITEM_ATTRIBUTE,
      payload: attr,
    });
  };

  const setItemCustomAttribute = (attr: CustomAttribute) => {
    dispatch({
      type: ENHANCED_ITEM_ACTION_TYPES.SET_ITEM_CUSTOM_ATTRIBUTE,
      payload: attr,
    });
  };

  const setInitialStatus = (
    initialStatus: Partial<EnhancedItem["initialStatus"]>,
  ) => {
    dispatch({
      type: ENHANCED_ITEM_ACTION_TYPES.SET_INITIAL_STATUS,
      payload: initialStatus,
    });
  };

  const contextValue = useMemo(
    () => ({
      itemConfig,
      enhancedItem,
      setItemAttribute,
      setItemCustomAttribute,
      setInitialStatus,
    }),
    [itemConfig, enhancedItem],
  );

  return (
    <EnhancedItemContext.Provider value={contextValue}>
      {children}
    </EnhancedItemContext.Provider>
  );
}

export function useEnhancedItem(): EnhancedItemContextType {
  const ctx = useContext(EnhancedItemContext);
  if (!ctx) {
    throw Error("Enhanced item context used outside provider!");
  }
  return ctx;
}

export default EnhancedItemProvider;
