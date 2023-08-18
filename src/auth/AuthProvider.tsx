import { ReactNode, useContext, useMemo, useState } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
    }),
    [isAuthenticated],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw Error("Reservation context used outside provider!");
  }
  return ctx;
}

export default AuthProvider;
