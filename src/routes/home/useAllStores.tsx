import { defer } from "react-router-dom";
import { getAllStoresQuery } from "./loader";

async function useAllStores() {
  const allStoresPromise = getAllStoresQuery();

  return defer({
    userApps: await allStoresPromise,
  });
}

export default useAllStores;
