import { useState } from "react";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { AddItemConfig, NewItem } from "./types";
import useNewItem from "./useNewItem";
import { Core, CustomAttribute, CustomAttributeSpec } from "../../types";

function useNewItemAttributes() {
  const addItemConfig = useNewItem();

  const [newItem, setNewItem] = useState<NewItem>(
    initializeNewItem(addItemConfig),
  );

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
    setCustomAttribute,
  };
}

const initialNewItem: Pick<
  NewItem,
  "title" | "subtitle" | "description" | "image"
> = {
  title: "",
  subtitle: "",
  description: "",
  image: "",
};

function initializeNewItem(config: AddItemConfig): NewItem {
  const { core, customAttributesSpec } = config;

  const customAttributeList = initializeCustomAttributes(customAttributesSpec);

  const optionalAttributes: Partial<NewItem> = {};

  if (core.uniqueness === false) {
    optionalAttributes.availableAmount = 0;
  }

  if (core.flexibility === false) {
    optionalAttributes.date = dayjs().toString();
  }

  if (shouldShowSubItems(core)) {
    optionalAttributes.subItemList = [];
  }

  return { ...initialNewItem, customAttributeList, ...optionalAttributes };
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

export const shouldShowSubItems = (core: Core) => {
  const {
    flexibility: f,
    simultaneous: s,
    uniqueness: u,
    periodicity: p,
    specificReservation: r,
  } = core;

  return (
    ((!f && !s && !u && p && !r) ||
      (!f && s && !u && !p && r) ||
      (!f && s && !u && p && !r)) === true
  );
};

export default useNewItemAttributes;
