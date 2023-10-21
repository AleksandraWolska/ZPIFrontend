import { ReactNode, useContext, useMemo, useReducer } from "react";
import useEnhancedItem from "./useEnhancedItem";
import {
  ENHANCED_ITEM_ACTION_TYPES,
  enhancedItemReducer,
} from "../enhancedItemReducer";
import { EnhancedItem } from "../types";
import { CustomAttribute } from "../../../types";
import { EditItemContext, EditItemContextType } from "./EditItemContext";
import useItemConfig from "./useItemConfig";

function EditItemProvider({ children }: { children: ReactNode }) {
  const enhancedItemToBeEdited = useEnhancedItem();
  const itemConfig = useItemConfig();

  const [enhancedItem, dispatch] = useReducer(
    enhancedItemReducer,
    enhancedItemToBeEdited,
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
    <EditItemContext.Provider value={contextValue}>
      {children}
    </EditItemContext.Provider>
  );
}

export function useEditItem(): EditItemContextType {
  const ctx = useContext(EditItemContext);
  if (!ctx) {
    throw Error("EditItem context used outside provider!");
  }
  return ctx;
}

export default EditItemProvider;
