import Stepper from "./Stepper";
import NewItemSchemaProvider from "./NewItemSchemaProvider";

function NewItem() {
  return (
    <NewItemSchemaProvider>
      <Stepper />
    </NewItemSchemaProvider>
  );
}

export default NewItem;
