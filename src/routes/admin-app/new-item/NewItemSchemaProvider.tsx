import { ReactNode, useContext, useMemo, useReducer } from "react";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { NewItem, NewItemConfig, NewItemSchema, Schedule } from "./types";
import { Core, CustomAttribute, CustomAttributeSpec } from "../../../types";
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
    attr: Partial<Omit<NewItem, "customAttributeList">>,
  ) => {
    dispatch({
      type: NEW_ITEM_SCHEMA_ACTION_TYPES.SET_ITEM_ATTRIBUTE,
      payload: attr,
    });
  };

  const setItemCustomAttribute = (attr: CustomAttribute) => {
    dispatch({
      type: NEW_ITEM_SCHEMA_ACTION_TYPES.SET_ITEM_CUSTOM_ATTRIBUTE,
      payload: attr,
    });
  };

  const setOption = (option: Partial<NewItemSchema["options"]>) => {
    dispatch({
      type: NEW_ITEM_SCHEMA_ACTION_TYPES.SET_OPTION,
      payload: option,
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
      schedule: initializeSchedule(core),
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

function initializeSchedule(core: Core): Schedule {
  if (core.flexibility === false) {
    return {
      startDateTime: dayjs(),
    };
  }

  if (core.granularity === true) {
    return {
      scheduledSlots: [],
    };
  }

  if (core.granularity === false) {
    return {
      scheduledRanges: [],
    };
  }

  throw Error("Invalid core configuration!");
}

export const askForAmount = (core: Core) => core.uniqueness === false;

export const askForSubItems = (core: Core) => {
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

export default NewItemSchemaProvider;
