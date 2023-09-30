import { QueryClient } from "react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { CustomAttributeSpec } from "../userapp/mocks/types";

const fetchCustomAttributesSpec = async (
  storeId: string,
): Promise<CustomAttributeSpec[]> => {
  const res = await fetch(`/api/stores/${storeId}/custom-attributes-spec`);
  return res.json();
};

export const getCustomAttributesSpecQuery = (storeId: string) => ({
  queryKey: ["custom-attributes-spec", storeId],
  queryFn: () => fetchCustomAttributesSpec(storeId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as { storeId: string };
    const query = getCustomAttributesSpecQuery(storeId);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
