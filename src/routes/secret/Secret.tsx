import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";

function Secret() {
  const auth = useAuth();

  return (
    <div>
      <p>
        Hello {auth.user?.profile.preferred_username}! This is the secret page.
      </p>

      <Link to="/">Home</Link>

      <button
        type="button"
        onClick={() => {
          auth.signoutSilent();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Secret;
