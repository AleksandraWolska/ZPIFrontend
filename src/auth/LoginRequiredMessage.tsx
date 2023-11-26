import { useAuth } from "react-oidc-context";
import { useLocation } from "react-router-dom";

function LoginRequiredMessage() {
  const auth = useAuth();
  const location = useLocation();

  return (
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

export default LoginRequiredMessage;
