import { ReactNode, useContext, useMemo, useReducer } from "react";
import { ITEM_FORM_ACTION_TYPES, itemFormReducer } from "./itemFormReducer";
import { CustomAttribute, Item } from "../../../../types";
import { ItemFormContext, ItemFormContextType } from "./ItemFormContext";

function ItemFormProvider({
  children,
  initialItem,
}: {
  children: ReactNode;
  initialItem: Item;
}) {
  const [item, dispatch] = useReducer(itemFormReducer, initialItem);

  const setItem = (attr: Partial<Item>) => {
    dispatch({
      type: ITEM_FORM_ACTION_TYPES.SET_ITEM,
      payload: attr,
    });
  };

  const setItemAttribute = (attr: Partial<Item["attributes"]>) => {
    dispatch({
      type: ITEM_FORM_ACTION_TYPES.SET_ITEM_ATTRIBUTE,
      payload: attr,
    });
  };

  const setItemCustomAttribute = (attr: CustomAttribute) => {
    dispatch({
      type: ITEM_FORM_ACTION_TYPES.SET_ITEM_CUSTOM_ATTRIBUTE,
      payload: attr,
    });
  };

  const setSubItems = (subItems: Item["subItems"]) => {
    dispatch({
      type: ITEM_FORM_ACTION_TYPES.SET_SUB_ITEMS,
      payload: subItems,
    });
  };

  const contextValue = useMemo(
    () => ({
      item,
      setItem,
      setItemAttribute,
      setItemCustomAttribute,
      setSubItems,
    }),
    [item],
  );

  return (
    <ItemFormContext.Provider value={contextValue}>
      {children}
    </ItemFormContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useItemForm(): ItemFormContextType {
  const ctx = useContext(ItemFormContext);
  if (!ctx) {
    throw Error("Item form context used outside provider!");
  }
  return ctx;
}

export default ItemFormProvider;
