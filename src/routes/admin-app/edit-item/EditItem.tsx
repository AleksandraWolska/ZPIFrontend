import EnhancedItemProvider from "../enhanced-item-context/EnhancedItemProvider";
import useEnhancedItemToBeEdited from "./useEnhancedItemToBeEdited";
import GeneralInfo from "../enhanced-item-form/GeneralInfo";
import CustomAttributes from "../enhanced-item-form/CustomAttributes";
import { askForSubItems } from "../utils";
import SubItems from "../enhanced-item-form/SubItems";
import Schedule from "../enhanced-item-form/schedule/Schedule";
import Summary from "./Summary";
import { Core } from "../../../types";
import useItemConfig from "./useItemConfig";
import Stepper from "../enhanced-item-form/Stepper";

function EditItem() {
  const itemConfig = useItemConfig();
  const enhancedItemToBeEdited = useEnhancedItemToBeEdited();

  const steps = getSteps(itemConfig.core);

  return (
    <EnhancedItemProvider initialEnhancedItem={enhancedItemToBeEdited}>
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
    component: <Schedule />,
  });
  steps.push({
    label: "Summary",
    component: <Summary />,
  });

  return steps;
};

export default EditItem;
