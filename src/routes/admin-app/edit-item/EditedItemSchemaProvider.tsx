import { ReactNode } from "react";
import useEditItem from "./useEditItem";

function EditedItemSchemaProvider({ children }: { children: ReactNode }) {
  const schema = useEditItem();

  console.log("item schema", schema);

  return <div>{children}</div>;
}

export default EditedItemSchemaProvider;
