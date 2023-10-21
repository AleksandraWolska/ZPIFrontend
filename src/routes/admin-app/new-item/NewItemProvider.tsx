import { ReactNode, useContext, useMemo, useReducer } from "react";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { Core, CustomAttribute, CustomAttributeSpec } from "../../../types";
import useItemConfig from "./useItemConfig";
import { NewItemContext, NewItemContextType } from "./NewItemContext";
import { EnhancedItem, ItemConfig, Schedule } from "../types";
import {
  ENHANCED_ITEM_ACTION_TYPES,
  enhancedItemReducer,
} from "../enhancedItemReducer";

function NewItemProvider({ children }: { children: ReactNode }) {
  const itemConfig = useItemConfig();

  const [enhancedItem, dispatch] = useReducer(
    enhancedItemReducer,
    initializeEnhancedItem(itemConfig),
  );

  const setItemAttribute = (
    attr: Partial<Omit<EnhancedItem["item"], "customAttributeList">>,
  ) => {
    dispatch({
      type: ENHANCED_ITEM_ACTION_TYPES.SET_ITEM_ATTRIBUTE,
      payload: attr,
    });
  };

  const setItemCustomAttribute = (attr: CustomAttribute) => {
    dispatch({
      type: ENHANCED_ITEM_ACTION_TYPES.SET_ITEM_CUSTOM_ATTRIBUTE,
      payload: attr,
    });
  };

  const setInitialStatus = (
    initialStatus: Partial<EnhancedItem["initialStatus"]>,
  ) => {
    dispatch({
      type: ENHANCED_ITEM_ACTION_TYPES.SET_INITIAL_STATUS,
      payload: initialStatus,
    });
  };

  const contextValue = useMemo(
    () => ({
      itemConfig,
      enhancedItem,
      setItemAttribute,
      setItemCustomAttribute,
      setInitialStatus,
    }),
    [itemConfig, enhancedItem],
  );

  return (
    <NewItemContext.Provider value={contextValue}>
      {children}
    </NewItemContext.Provider>
  );
}

export function useNewItem(): NewItemContextType {
  const ctx = useContext(NewItemContext);
  if (!ctx) {
    throw Error("NewItemSchema context used outside provider!");
  }
  return ctx;
}

function initializeEnhancedItem(config: ItemConfig): EnhancedItem {
  const { core, customAttributesSpec } = config;

  const enhancedItem: EnhancedItem = {
    item: {
      id: uuid(),
      ...defaultEnhancedItem,
      customAttributeList: initializeCustomAttributes(customAttributesSpec),
    },
    initialStatus: {
      schedule: initializeSchedule(core),
    },
  };

  if (askForAmount(core)) {
    enhancedItem.initialStatus.amount = 0;
  }

  if (askForSubItems(core)) {
    enhancedItem.item.subItemList = [];
  }

  return enhancedItem;
}

const defaultEnhancedItem: Omit<
  EnhancedItem["item"],
  "id" | "customAttributeList"
> = {
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
      startDateTime: dayjs().toString(),
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

export default NewItemProvider;
