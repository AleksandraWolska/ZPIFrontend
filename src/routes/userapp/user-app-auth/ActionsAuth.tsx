import { ReactNode } from "react";
import useAuthConfig from "./useAuthConfig";
import RequireLoginChildren from "../../../auth/RequireLoginChildren";

function ActionsAuth({ children }: { children: ReactNode }) {
  const authConfig = useAuthConfig();

  console.log("authConfig in details", authConfig);

  return authConfig.requireAuthForActions ? (
    <RequireLoginChildren>{children}</RequireLoginChildren>
  ) : (
    children
  );
}

export default ActionsAuth;
