import { Outlet } from "react-router-dom";
import useAuthConfig from "./useAuthConfig";
import RequireLoginRoute from "../../../auth/RequireLoginRoute";

function StoreAccessAuth() {
  const authConfig = useAuthConfig();
  console.log("authConfig", authConfig);

  return authConfig.requireAuthForStoreAccess ? (
    <RequireLoginRoute />
  ) : (
    <Outlet />
  );
}

export default StoreAccessAuth;
