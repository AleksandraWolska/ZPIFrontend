import EditItemProvider from "./EditItemProvider";
import Stepper from "./Stepper";

function EditItem() {
  return (
    <EditItemProvider>
      <Stepper />
    </EditItemProvider>
  );
}

export default EditItem;
