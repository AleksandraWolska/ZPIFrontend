import { useNewItemSchemaConfig } from "../NewItemSchemaProvider";
import useAddNewItemSchema from "../useAddNewItemSchema";

function Summary() {
  const { newItemSchema } = useNewItemSchemaConfig();
  const addNewItem = useAddNewItemSchema();

  return (
    <>
      <div>{JSON.stringify(newItemSchema)}</div>
      <button
        type="button"
        onClick={() => {
          addNewItem.mutate(newItemSchema);
        }}
      >
        ADD ITEM
      </button>
    </>
  );
}

export default Summary;
