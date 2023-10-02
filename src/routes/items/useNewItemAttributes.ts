import { useState } from "react";
import { NewItem } from "./types";
import useNewItem from "./useNewItem";
import { CustomAttribute, CustomAttributeSpec } from "../userapp/mocks/types";

const initialNewItem = {
  title: "",
  subtitle: "",
  description: "",
  image: "",
  availableAmount: 0,
  subitemList: [],
};

function useNewItemAttributes() {
  const { customAttributesSpec } = useNewItem();
  const customAttributeList = initializeCustomAttributes(customAttributesSpec);

  const [newItem, setNewItem] = useState<NewItem>({
    ...initialNewItem,
    customAttributeList,
  });

  const setAttribute = (attr: Partial<NewItem>) => {
    setNewItem({
      ...newItem,
      ...attr,
    });
  };

  const setCustomAttribute = (attr: CustomAttribute) => {
    setNewItem({
      ...newItem,
      customAttributeList: newItem.customAttributeList?.map((item) => {
        if (item.name === attr.name) {
          return attr;
        }
        return item;
      }),
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

export default useNewItemAttributes;
