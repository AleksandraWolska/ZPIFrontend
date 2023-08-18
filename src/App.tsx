import "./App.css";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { AuthProvider } from "react-oidc-context";
import router from "./router";
import { queryClient } from "./query";
import { oidcConfig } from "./auth/config";

function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
