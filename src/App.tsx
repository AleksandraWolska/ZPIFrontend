import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AuthProvider } from "react-oidc-context";
import router from "./router";
import { queryClient } from "./query";
import theme from "./theme";
import { oidcConfig } from "./auth/utils";

function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}

export default App;
