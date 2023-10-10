import { ReactNode, useContext, useMemo, useReducer } from "react";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { NewItem, NewItemConfig, NewItemSchema, Schedule } from "./types";
import {
  Core,
  CustomAttribute,
  CustomAttributeSpec,
  ScheduleType,
} from "../../types";
import useNewItemConfig from "./useNewItemConfig";
import {
  NEW_ITEM_SCHEMA_ACTION_TYPES,
  newItemSchemaReducer,
} from "./newItemSchemaReducer";
import {
  NewItemSchemaContext,
  NewItemSchemaContextType,
} from "./NewItemSchemaContext";

function NewItemSchemaProvider({ children }: { children: ReactNode }) {
  const newItemConfig = useNewItemConfig();

  const [newItemSchema, dispatch] = useReducer(
    newItemSchemaReducer,
    initializeNewItemSchema(newItemConfig),
  );

  const setItemAttribute = (
    key: keyof Omit<NewItem, "customAttributeList">,
    value: Omit<NewItem, "customAttributeList">[typeof key],
  ) => {
    dispatch({
      type: NEW_ITEM_SCHEMA_ACTION_TYPES.SET_ITEM_ATTRIBUTE,
      payload: { [key]: value },
    });
  };

  const setItemCustomAttribute = (attribute: CustomAttribute) => {
    dispatch({
      type: NEW_ITEM_SCHEMA_ACTION_TYPES.SET_ITEM_CUSTOM_ATTRIBUTE,
      payload: attribute,
    });
  };

  const setOption = (
    key: keyof NewItemSchema["options"],
    value: NewItemSchema["options"][typeof key],
  ) => {
    dispatch({
      type: NEW_ITEM_SCHEMA_ACTION_TYPES.SET_OPTION,
      payload: { [key]: value },
    });
  };

  const contextValue = useMemo(
    () => ({
      newItemConfig,
      newItemSchema,
      setItemAttribute,
      setItemCustomAttribute,
      setOption,
    }),
    [newItemConfig, newItemSchema],
  );

  return (
    <NewItemSchemaContext.Provider value={contextValue}>
      {children}
    </NewItemSchemaContext.Provider>
  );
}

export function useNewItemSchemaConfig(): NewItemSchemaContextType {
  const ctx = useContext(NewItemSchemaContext);
  if (!ctx) {
    throw Error("NewItemSchema context used outside provider!");
  }
  return ctx;
}

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

const defaultNewItem: Omit<NewItem, "customAttributeList"> = {
  active: true,
  title: "",
  subtitle: "",
  description: "",
  image: "",
};

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

export const askForAmount = (core: Core) => core.uniqueness === false;

export const askForSubItems = (core: Core) => {
  const {
    simultaneous: s,
    uniqueness: u,
    periodicity: p,
    specificReservation: r,
  } = core;

  const f = core.scheduleType !== "fixed";

  return (
    ((!f && !s && !u && p && !r) ||
      (!f && s && !u && !p && r) ||
      (!f && s && !u && p && !r)) === true
  );
};

export default NewItemSchemaProvider;
