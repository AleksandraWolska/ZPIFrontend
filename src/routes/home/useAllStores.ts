import { useLoaderData } from "react-router-dom";
import { StoreSummary } from "../../types";

function useAllStores() {
  const data = useLoaderData() as {
    allStores: Promise<StoreSummary[]>;
  };

  return data.allStores;
}

export default useAllStores;
