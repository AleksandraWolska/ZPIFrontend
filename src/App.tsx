import "./App.css";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import router from "./router";
import { queryClient } from "./query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
