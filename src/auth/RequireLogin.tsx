import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function RequireLogin() {
  const { isAuthenticated } = useAuth();

  console.log("isAuthenticated", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <div>Not logged in!</div>;
}

export default RequireLogin;
