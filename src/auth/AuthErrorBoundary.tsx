import { useRevalidator, useRouteError } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import LoginRequiredMessage from "./LoginRequiredMessage";

function AuthErrorBoundary() {
  console.log("ERROR");

  const error = useRouteError() as
    | {
        status: number;
        data: {
          message: string;
        };
      }
    | undefined;

  const auth = useAuth();
  const revalidator = useRevalidator();

  if (error?.status === 401 && auth.isAuthenticated) {
    setTimeout(() => {
      revalidator.revalidate();
    }, 25);
  }

  if (error?.status === 401) {
    return <LoginRequiredMessage />;
  }

  return null;
}

export default AuthErrorBoundary;
