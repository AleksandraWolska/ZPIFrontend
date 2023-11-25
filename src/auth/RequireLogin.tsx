import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "react-oidc-context";
// import { useEffect } from "react";

function RequireLogin() {
  const auth = useAuth();
  const location = useLocation();

  return auth.isAuthenticated ? (
    <Outlet />
  ) : (
    <div>
      <p>You are not logged in!</p>
      <button
        type="button"
        onClick={() => {
          const currentPath = location.pathname + location.search;
          auth.signinRedirect({
            redirect_uri: `${window.location.origin}${currentPath}`,
          });
        }}
      >
        Login
      </button>
    </div>
  );
}

export default RequireLogin;
