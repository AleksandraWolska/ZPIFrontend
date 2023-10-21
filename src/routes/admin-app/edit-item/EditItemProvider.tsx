import { ReactNode } from "react";
import useEditItem from "./useEditItem";

function EditItemProvider({ children }: { children: ReactNode }) {
  const enhancedItem = useEditItem();

  console.log("enhancedItem", enhancedItem);

  return <div>{children}</div>;
}

export default EditItemProvider;
