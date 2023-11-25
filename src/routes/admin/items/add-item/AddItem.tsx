import { v4 as uuid } from "uuid";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import ItemFormProvider from "../item-form/ItemFormProvider";
import { ItemConfig, Schedule } from "../../types";
import {
  Core,
  CustomAttribute,
  CustomAttributeSpec,
  Item,
} from "../../../../types";
import {
  askForItemAmount,
  askForSubItems,
  askForSubItemSchedule,
} from "../utils";
import GeneralInfo from "../item-form/GeneralInfo";
import CustomAttributes from "../item-form/CustomAttributes";
import SubItems from "../item-form/SubItems";
import Summary from "./Summary";
import ScheduleComponent from "../item-form/schedule/Schedule";
import Stepper from "../item-form/Stepper";
import useStoreConfig from "../../admin-app/useStoreConfig";

function AddItem() {
  const storeConfig = useStoreConfig();

  const steps = getSteps(storeConfig.core);

  return (
    <ItemFormProvider
      initialItem={initializeItem({
        core: storeConfig.core,
        customAttributesSpec: storeConfig.customAttributesSpec,
      })}
    >
      <Box
        sx={{
          maxWidth: "1000px",
          width: "90vw",
          boxShadow: "1px 1px 5px 2px rgba(0, 0, 0, .2)",
          borderRadius: "15px",
          padding: 1.25,
          margin: 1.25,
        }}
      >
        <Stepper steps={steps} />
      </Box>
    </ItemFormProvider>
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
  if (!askForSubItemSchedule(core))
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

function initializeItem(config: ItemConfig): Item {
  const { core, customAttributesSpec } = config;

  const item: Item = {
    id: uuid(),
    attributes: {
      title: "",
      subtitle: "",
      description: "",
      image: "",
    },
    customAttributeList: initializeCustomAttributes(customAttributesSpec),
    schedule: initializeSchedule(core),
    active: true,
  };

  if (askForItemAmount(core)) {
    item.amount = 0;
  }

  if (askForSubItems(core)) {
    item.subItems = [];
  }

  return item;
}

function initializeCustomAttributes(
  customAttributesSpec: CustomAttributeSpec[],
): CustomAttribute[] {
  return customAttributesSpec.map((spec) => {
    const value =
      spec.dataType === "string" ? "" : spec.dataType === "number" ? 0 : false;

    return {
      id: spec.id,
      name: spec.name,
      value,
    };
  });
}

function initializeSchedule(core: Core): Schedule {
  if (core.flexibility === false) {
    return {
      startDateTime: dayjs().toISOString(),
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

export default AddItem;
