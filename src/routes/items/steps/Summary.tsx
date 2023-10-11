import { useNewItemSchemaConfig } from "../NewItemSchemaProvider";

function Summary() {
  const { newItemSchema } = useNewItemSchemaConfig();

  return <div>{JSON.stringify(newItemSchema)}</div>;
}

export default Summary;
