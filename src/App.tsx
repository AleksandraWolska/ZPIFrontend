import "./App.css";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { AuthProvider } from "react-oidc-context";
import router from "./router";
import { queryClient } from "./query";
import { oidcConfig } from "./auth/config";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <LocalizationProvider dateAdapter={AdapterDayjs as any}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}

export default App;
