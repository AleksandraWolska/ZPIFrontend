import { Link } from "react-router-dom";
import { keycloak } from "../../auth/keycloak";

function Secret() {
  return (
    <div>
      <p>
        Hello {keycloak.tokenParsed?.preferred_username}! This is the secret
        page.
      </p>

      <Link to="/">Home</Link>

      <button
        type="button"
        onClick={() => {
          keycloak.logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Secret;
