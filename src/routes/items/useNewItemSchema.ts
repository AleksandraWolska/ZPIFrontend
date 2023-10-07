import { useState } from "react";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { NewItemSchema, NewItemConfig, NewItemOptions, NewItem } from "./types";
import useNewItemConfig from "./useNewItemConfig";
import { Core, CustomAttribute, CustomAttributeSpec } from "../../types";

function useNewItemSchema() {
  const newItemConfig = useNewItemConfig();

  const [newItemSchema, setNewItemSchema] = useState<NewItemSchema>(
    initializeNewItemSchema(newItemConfig),
  );

  const setItemAttribute = (attr: Partial<NewItem>) => {
    setNewItemSchema((prev) => ({
      ...prev,
      item: {
        ...prev.item,
        ...attr,
      },
    }));
  };

  const setItemCustomAttribute = (attr: CustomAttribute) => {
    setNewItemSchema((prev) => ({
      ...prev,
      item: {
        ...prev.item,
        customAttributeList: prev.item.customAttributeList.map((ca) => {
          if (ca.id === attr.id) {
            return attr;
          }
          return ca;
        }),
      },
    }));
  };

  const setItemOption = (option: Partial<NewItemOptions>) => {
    setNewItemSchema((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        ...option,
      },
    }));
  };

  return {
    newItemSchema,
    setItemAttribute,
    setItemCustomAttribute,
    setItemOption,
  };
}

const defaultNewItemSchema: NewItemSchema = {
  item: {
    active: true,
    title: "",
    subtitle: "",
    description: "",
    image: "",
    customAttributeList: [],
  },
  options: {},
};

function initializeNewItemSchema(config: NewItemConfig): NewItemSchema {
  const { core, customAttributesSpec } = config;

  const schema: NewItemSchema = { ...defaultNewItemSchema };

  schema.item.customAttributeList =
    initializeCustomAttributes(customAttributesSpec);

  if (core.uniqueness === false) {
    schema.options.amount = 0;
  }

  if (core.flexibility === false) {
    schema.options.schedule = dayjs().toString();
  }

  if (shouldShowSubItems(core)) {
    schema.item.subItemList = [];
  }

  return schema;
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

export default useNewItemSchema;
