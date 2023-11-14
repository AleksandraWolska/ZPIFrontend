import { QueryClient } from "react-query";

export const BACKEND_URL =
  process.env.NODE_ENV === "development" ? "" : "https://zpibackend.fly.dev";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      notifyOnChangePropsExclusions: ["isStale"],
      refetchOnWindowFocus: false,
    },
  },
});
