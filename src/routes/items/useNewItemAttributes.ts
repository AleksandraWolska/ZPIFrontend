import { useState } from "react";
import { v4 as uuid } from "uuid";
import { NewItem } from "./types";
import useNewItem from "./useNewItem";
import { CustomAttribute, CustomAttributeSpec } from "../../types";

const initialNewItem: Omit<NewItem, "customAttributeList"> = {
  title: "",
  subtitle: "",
  description: "",
  image: "",
  availableAmount: 0,
  subItemList: [],
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
        if (item.id === attr.id) {
          return attr;
        }
        return item;
      }),
    });
  };

  return {
    newItem,
    setAttribute,
    customAttributesSpec,
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
      id: uuid(),
      name: spec.name,
      value,
    };
  });
}

export default useNewItemAttributes;
