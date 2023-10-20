import { useNewItemSchemaConfig } from "../NewItemSchemaProvider";
import CustomAttributesForm from "../../components/CustomAttributesForm";

function CustomAttributes() {
  const { newItemConfig, newItemSchema, setItemCustomAttribute } =
    useNewItemSchemaConfig();

  return (
    <CustomAttributesForm
      itemSchema={newItemSchema}
      setItemCustomAttribute={setItemCustomAttribute}
      customAttributesSpec={newItemConfig.customAttributesSpec}
    />
  );
}

export default CustomAttributes;
