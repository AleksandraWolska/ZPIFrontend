import { useState } from "react";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { NewItemSchema, NewItemConfig, NewItemOptions, NewItem } from "./types";
import useNewItemConfig from "./useNewItemConfig";
import { CustomAttribute, CustomAttributeSpec } from "../../types";
import { askForAmount, askForDate, askForSubItems } from "./utils";

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

  if (askForAmount(core)) {
    schema.options.amount = 0;
  }

  if (askForDate(core)) {
    schema.options.schedule = dayjs().toString();
  }

  if (askForSubItems(core)) {
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

export default useNewItemSchema;
