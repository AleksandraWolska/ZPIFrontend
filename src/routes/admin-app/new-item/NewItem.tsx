import Stepper from "./Stepper";
import NewItemProvider from "./NewItemProvider";

function NewItem() {
  return (
    <NewItemProvider>
      <Stepper />
    </NewItemProvider>
  );
}

export default NewItem;
