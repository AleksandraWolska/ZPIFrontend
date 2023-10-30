import { useNavigate } from "react-router-dom";
import ItemFormProvider, { useItemForm } from "../item-form/ItemFormProvider";
import useItemToBeEdited from "./useItemToBeEdited";
import GeneralInfo from "../item-form/GeneralInfo";
import CustomAttributes from "../item-form/CustomAttributes";
import { askForSubItems, askForSubItemSchedule } from "../utils";
import SubItems from "../item-form/SubItems";
import { Core } from "../../../../types";
import Stepper from "../item-form/Stepper";
import Schedule from "../item-form/schedule/Schedule";
import useEditItem from "./useEditItem";
import useStoreConfig from "../../useStoreConfig";

function EditItem() {
  const itemToBeEdited = useItemToBeEdited();

  return (
    <ItemFormProvider initialItem={itemToBeEdited}>
      <EditForm />
    </ItemFormProvider>
  );
}

function EditForm() {
  const storeConfig = useStoreConfig();
  const { item } = useItemForm();
  const editItem = useEditItem();
  const navigate = useNavigate();

  const steps = getSteps(storeConfig.core);

  return (
    <>
      <Stepper steps={steps} />
      <button
        type="button"
        onClick={() => {
          editItem.mutate(item, {
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
