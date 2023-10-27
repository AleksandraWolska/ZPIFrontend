import { useNavigate } from "react-router-dom";
import useItemToBeEdited from "./useItemToBeEdited";
import ItemFormProvider, {
  useItemForm,
} from "../item-form/ItemFormProvider";
import Schedule from "../item-form/schedule/Schedule";
import useEditItem from "./useEditItem";

function RescheduleItem() {
  const itemToBeEdited = useItemToBeEdited();

  return (
    <ItemFormProvider initial={itemToBeEdited}>
      <ScheduleForm />
    </ItemFormProvider>
  );
}

function ScheduleForm() {
  const { item } = useItemForm();
  const editItem = useEditItem();
  const navigate = useNavigate();

  return (
    <>
      <Schedule />
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
        RESCHEDULE
      </button>
    </>
  );
}

export default RescheduleItem;
