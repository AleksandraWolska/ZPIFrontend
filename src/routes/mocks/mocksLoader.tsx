// mocksLoader.tsx
import { QueryClient } from "react-query";

const fetchMocks = async (): Promise<unknown> => {
  const res = await fetch("/api/usr");
  return res.json();
};

export const mocksQuery = {
  queryKey: ["mocks"],
  queryFn: fetchMocks,
};

export const mocksLoader = (queryClient: QueryClient) => async () => {
  return (
    queryClient.getQueryData(mocksQuery.queryKey) ??
    (await queryClient.fetchQuery(mocksQuery))
  );
};
