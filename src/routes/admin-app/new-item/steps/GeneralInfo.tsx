import { useNewItemSchemaConfig } from "../NewItemSchemaProvider";
import GeneralInfoForm from "../../components/GeneralInfoForm";

function GeneralInfo() {
  const { newItemConfig, newItemSchema, setItemAttribute, setOption } =
    useNewItemSchemaConfig();

  return (
    <GeneralInfoForm
      itemSchema={newItemSchema}
      setItemAttribute={setItemAttribute}
      setOption={setOption}
      core={newItemConfig.core}
    />
  );
}

export default GeneralInfo;
