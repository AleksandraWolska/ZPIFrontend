import { useSchema } from "../SchemaProvider";

function PrintSchema() {
  const { schema } = useSchema();

  return <div>{JSON.stringify(schema)}</div>;
}

export default PrintSchema;
