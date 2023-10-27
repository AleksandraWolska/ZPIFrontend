import { useNavigate } from "react-router-dom";
import useAddItem, { removeIdsFromItem } from "./useAddItem";
import { useItemForm } from "../item-form/ItemFormProvider";

function Summary() {
  const { item } = useItemForm();
  const addItem = useAddItem();
  const navigate = useNavigate();

  return (
    <>
      <div>{JSON.stringify(item)}</div>
      <button
        type="button"
        onClick={() => {
          addItem.mutate(removeIdsFromItem(item), {
            onSuccess: () => {
              navigate("../item-list", { relative: "path" });
            },
          });
        }}
      >
        ADD ITEM
      </button>
    </>
  );
}

export default Summary;
