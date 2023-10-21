import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import EnhancedItemProvider from "../enhanced-item-context/EnhancedItemProvider";
import { EnhancedItem, ItemConfig, Schedule } from "../../types";
import { Core, CustomAttribute, CustomAttributeSpec } from "../../../../types";
import { askForAmount, askForSubItems } from "../utils";
import GeneralInfo from "../enhanced-item-form/GeneralInfo";
import CustomAttributes from "../enhanced-item-form/CustomAttributes";
import SubItems from "../enhanced-item-form/SubItems";
import Summary from "./Summary";
import ScheduleComponent from "../enhanced-item-form/schedule/Schedule";
import Stepper from "../enhanced-item-form/Stepper";
import useItemConfig from "../common-data/useItemConfig";

function NewItem() {
  const itemConfig = useItemConfig();

  const steps = getSteps(itemConfig.core);

  return (
    <EnhancedItemProvider
      initialEnhancedItem={initializeEnhancedItem(itemConfig)}
    >
      <Stepper steps={steps} />
    </EnhancedItemProvider>
  );
}

const getSteps = (core: Core) => {
  const steps = [];

  steps.push({
    label: "General Info",
    component: <GeneralInfo />,
  });
  steps.push({
    label: "Custom Attributes",
    component: <CustomAttributes />,
  });
  if (askForSubItems(core))
    steps.push({
      label: "Sub Items",
      component: <SubItems />,
    });
  steps.push({
    label: "Schedule",
    component: <ScheduleComponent />,
  });
  steps.push({
    label: "Summary",
    component: <Summary />,
  });

  return steps;
};

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
