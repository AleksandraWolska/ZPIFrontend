import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { CustomAttributeSpec } from "../userapp/mocks/types";
import { getCustomAttributesSpecQuery } from "./loader";

function useNewItem() {
  const params = useParams() as { storeId: string };

  const { data } = useQuery(getCustomAttributesSpecQuery(params.storeId)) as {
    data: CustomAttributeSpec[];
  };

  return data;
}

export default useNewItem;
