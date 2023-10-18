import { Outlet } from "react-router-dom";
import { keycloak } from "./keycloak";

function RequireLogin() {
  console.log("auth", keycloak);

  return keycloak.authenticated ? (
    <Outlet />
  ) : (
    <div>
      <p>You are not logged in!</p>

      <button
        type="button"
        onClick={() => {
          keycloak.login();
        }}
      >
        Login
      </button>
    </div>
  );
}

export default RequireLogin;
