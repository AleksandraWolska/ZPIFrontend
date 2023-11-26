import { Outlet } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import LoginRequiredMessage from "./LoginRequiredMessage";

// import { useEffect } from "react";

function RequireLogin() {
  const auth = useAuth();

  return auth.isAuthenticated ? <Outlet /> : <LoginRequiredMessage />;
}

export default RequireLogin;
