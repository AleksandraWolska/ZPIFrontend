import { ReactNode } from "react";
import useEditItem from "./useEditItem";

function EditedItemSchemaProvider({ children }: { children: ReactNode }) {
  const item = useEditItem();

  console.log("item", item);

  return <div>{children}</div>;
}

export default EditedItemSchemaProvider;
