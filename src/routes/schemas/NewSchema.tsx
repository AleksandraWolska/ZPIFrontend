import SchemaProvider from "./SchemaProvider";
import Stepper from "./Stepper";

function NewSchema() {
  return (
    <SchemaProvider>
      <Stepper />
    </SchemaProvider>
  );
}

export default NewSchema;
