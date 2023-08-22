import { useAuth } from "react-oidc-context";

function Secret() {
  const auth = useAuth();

  return (
    <div>
      <p>
        Hello {auth.user?.profile.preferred_username}! This is the secret page.
      </p>

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
