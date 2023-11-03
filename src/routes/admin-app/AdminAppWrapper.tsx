import { Outlet } from "react-router-dom";
import useStoreConfig from "./useStoreConfig";
import StoreConfigWizard from "../store-config-wizard/StoreConfigWizard";
import TopBar from "./TopBar";

function AdminAppWrapper() {
  const storeConfig = useStoreConfig();

  return storeConfig ? (
    <>
      <TopBar />
      <Outlet />
    </>
  ) : (
    <StoreConfigWizard />
  );
}

export default AdminAppWrapper;
