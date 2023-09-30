import { useReducer } from "react";
import { NEW_ITEM_ACTION_TYPES, newItemReducer } from "./newItemReducer";
import { NewItem } from "./types";

const initialNewItem: NewItem = {
  title: "",
  subtitle: "",
  description: "",
  image: "",
  availableAmount: 0,
  subitemList: [],
  customAttributeList: [],
};

function useNewItem() {
  const [newItem, dispatch] = useReducer(newItemReducer, initialNewItem);

  const setAttribute = (attr: Partial<NewItem>) => {
    dispatch({
      type: NEW_ITEM_ACTION_TYPES.SET_ATTRIBUTE,
      payload: attr,
    });
  };

  return {
    newItem,
    setAttribute,
  };
}

export default useNewItem;
