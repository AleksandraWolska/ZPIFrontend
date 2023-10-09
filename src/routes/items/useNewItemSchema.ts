import { useState } from "react";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import {
  NewItemSchema,
  NewItemConfig,
  NewItemOptions,
  NewItem,
  Schedule,
} from "./types";
import useNewItemConfig from "./useNewItemConfig";
import {
  CustomAttribute,
  CustomAttributeSpec,
  ScheduleType,
} from "../../types";
import { askForAmount, askForSubItems } from "./utils";

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

const defaultNewItem: Omit<NewItem, "customAttributeList"> = {
  active: true,
  title: "",
  subtitle: "",
  description: "",
  image: "",
};

function initializeNewItemSchema(config: NewItemConfig): NewItemSchema {
  const { core, customAttributesSpec } = config;

  const schema: NewItemSchema = {
    item: {
      ...defaultNewItem,
      customAttributeList: initializeCustomAttributes(customAttributesSpec),
    },
    options: {
      schedule: initializeSchedule(core.scheduleType),
    },
  };

  if (askForAmount(core)) {
    schema.options.amount = 0;
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

function initializeSchedule(scheduleType: ScheduleType): Schedule {
  switch (scheduleType) {
    case "fixed":
      return {
        startDateTime: dayjs(),
        endDateTime: dayjs(),
      };
    case "shortSlots":
      return {
        scheduleSlots: [],
      };
    case "multiDay":
      return {
        startDate: dayjs(),
        endDate: dayjs(),
        reservationStartTime: dayjs(),
        reservationEndTime: dayjs(),
      };
    case "free":
      return {
        startDateTime: dayjs(),
        endDateTime: dayjs(),
      };
    default:
      throw new Error("Invalid schedule type");
  }
}

export default useNewItemSchema;
