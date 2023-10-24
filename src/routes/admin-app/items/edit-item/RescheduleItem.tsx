import { useNavigate } from "react-router-dom";
import useItemToBeEdited from "./useItemToBeEdited";
import EnhancedItemProvider, {
  useEnhancedItem,
} from "../enhanced-item-context/EnhancedItemProvider";
import Schedule from "../enhanced-item-form/schedule/Schedule";
import useEditItem from "./useEditItem";

function RescheduleItem() {
  const itemToBeEdited = useItemToBeEdited();

  return (
    <EnhancedItemProvider initialEnhancedItem={itemToBeEdited}>
      <ScheduleForm />
    </EnhancedItemProvider>
  );
}

function ScheduleForm() {
  const { enhancedItem } = useEnhancedItem();
  const editItem = useEditItem();
  const navigate = useNavigate();

  return (
    <>
      <Schedule />
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
        RESCHEDULE
      </button>
    </>
  );
}

export default RescheduleItem;
