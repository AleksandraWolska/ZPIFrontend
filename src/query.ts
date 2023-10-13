import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      notifyOnChangePropsExclusions: ["isStale"],
      refetchOnWindowFocus: false,
    },
  },
});
