import { Outlet } from "react-router-dom";
import { useAuth } from "react-oidc-context";

function RequireLoginRoute() {
  const auth = useAuth();

  console.log("auth", auth);

  return auth.isAuthenticated ? (
    <Outlet />
  ) : (
    <div>
      <p>You are not logged in!</p>
      <button
        type="button"
        onClick={() => {
          auth.signinRedirect();
        }}
      >
        Login
      </button>
    </div>
  );
}

export default RequireLoginRoute;
