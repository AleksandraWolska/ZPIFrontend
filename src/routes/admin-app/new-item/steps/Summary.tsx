import { useNewItemSchemaConfig } from "../NewItemSchemaProvider";
import useAddNewItem from "../useAddNewItem";

function Summary() {
  const { newItemSchema } = useNewItemSchemaConfig();
  const addNewItem = useAddNewItem();

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
