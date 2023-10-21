import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import Stepper from "./Stepper";
import EnhancedItemProvider from "../enhanced-item-context/EnhancedItemProvider";
import { EnhancedItem, ItemConfig, Schedule } from "../types";
import { Core, CustomAttribute, CustomAttributeSpec } from "../../../types";
import useItemConfig from "./useItemConfig";
import { askForAmount, askForSubItems } from "./utils";

function NewItem() {
  const itemConfig = useItemConfig();

  return (
    <EnhancedItemProvider
      initialEnhancedItem={initializeEnhancedItem(itemConfig)}
    >
      <Stepper />
    </EnhancedItemProvider>
  );
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

export default NewItem;
