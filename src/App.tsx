import "./App.css";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import router from "./router";
import { queryClient } from "./query";
import AuthProvider from "./auth/AuthProvider";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
