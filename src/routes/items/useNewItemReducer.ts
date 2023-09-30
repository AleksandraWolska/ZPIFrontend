import { useReducer } from "react";
import { NEW_ITEM_ACTION_TYPES, newItemReducer } from "./newItemReducer";
import { NewItem } from "./types";
import useNewItem from "./useNewItem";
import { CustomAttribute, CustomAttributeSpec } from "../userapp/mocks/types";

const initialNewItem: NewItem = {
  title: "",
  subtitle: "",
  description: "",
  image: "",
  availableAmount: 0,
};

function useNewItemReducer() {
  const customAttributesSpec = useNewItem();
  const customAttributeList = initializeCustomAttributes(customAttributesSpec);

  const [newItem, dispatch] = useReducer(newItemReducer, {
    ...initialNewItem,
    customAttributeList,
  });

  const setAttribute = (attr: Partial<NewItem>) => {
    dispatch({
      type: NEW_ITEM_ACTION_TYPES.SET_ATTRIBUTE,
      payload: attr,
    });
  };

  const setCustomAttribute = (attr: CustomAttribute) => {
    dispatch({
      type: NEW_ITEM_ACTION_TYPES.SET_CUSTOM_ATTRIBUTE,
      payload: attr,
    });
  };

  return {
    newItem,
    setAttribute,
    setCustomAttribute,
  };
}

function initializeCustomAttributes(
  customAttributesSpec: CustomAttributeSpec[],
): CustomAttribute[] {
  return customAttributesSpec.map((spec) => {
    const value =
      spec.dataType === "string" ? "" : spec.dataType === "number" ? 0 : false;

    return {
      name: spec.name,
      value,
    };
  });
}

export default useNewItemReducer;
