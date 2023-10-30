import { useAuth } from "react-oidc-context";
import { ReactNode } from "react";

function RequireLoginChildren({ children }: { children: ReactNode }) {
  const auth = useAuth();

  console.log("auth", auth);

  return auth.isAuthenticated ? (
    <div>{children}</div>
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

export default RequireLoginChildren;
