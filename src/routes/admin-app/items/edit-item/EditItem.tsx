import { useNavigate } from "react-router-dom";
import EnhancedItemProvider, {
  useEnhancedItem,
} from "../enhanced-item-context/EnhancedItemProvider";
import useItemToBeEdited from "./useItemToBeEdited";
import GeneralInfo from "../enhanced-item-form/GeneralInfo";
import CustomAttributes from "../enhanced-item-form/CustomAttributes";
import { askForSubItems, askForSubItemSchedule } from "../utils";
import SubItems from "../enhanced-item-form/SubItems";
import { Core } from "../../../../types";
import Stepper from "../enhanced-item-form/Stepper";
import useItemConfig from "../common-data/useItemConfig";
import Schedule from "../enhanced-item-form/schedule/Schedule";
import useEditItem from "./useEditItem";

function EditItem() {
  const itemToBeEdited = useItemToBeEdited();

  return (
    <EnhancedItemProvider initialEnhancedItem={itemToBeEdited}>
      <EditForm />
    </EnhancedItemProvider>
  );
}

function EditForm() {
  const itemConfig = useItemConfig();
  const { enhancedItem } = useEnhancedItem();
  const editItem = useEditItem();
  const navigate = useNavigate();

  const steps = getSteps(itemConfig.core);

  return (
    <>
      <Stepper steps={steps} />
      <button
        type="button"
        onClick={() => {
          editItem.mutate(enhancedItem, {
            onSuccess: () => {
              navigate("../..", { relative: "path" });
            },
          });
        }}
      >
        EDIT ITEM
      </button>
    </>
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
  if (core.flexibility === false && !askForSubItemSchedule(core))
    steps.push({
      label: "Schedule",
      component: <Schedule />,
    });

  return steps;
};

export default EditItem;
