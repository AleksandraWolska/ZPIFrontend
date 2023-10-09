import { NewItemSchema } from "../types";

function Summary({ newItemSchema }: { newItemSchema: NewItemSchema }) {
  return <div>{JSON.stringify(newItemSchema)}</div>;
}

export default Summary;
