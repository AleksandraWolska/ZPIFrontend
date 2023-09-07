import { createBrowserRouter } from "react-router-dom";
import { queryClient } from "./query";
import Home from "./routes/home/Home";
import { loader as todosLoader } from "./routes/todos/all-todos/loader";
import RequireLogin from "./auth/RequireLogin";
import Secret from "./routes/secret/Secret";
import UserApp from "./routes/userapp/UserApp";
import UserApp1 from "./routes/userapp/usecases/UserApp1";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "userapp",
    element: <UserApp />,
  },
  {
    path: "todos",
    lazy: async () => {
      const TodosLayout = (await import("./routes/todos/TodosLayout")).default;
      return { Component: TodosLayout };
    },
    children: [
      {
        path: "all",
        loader: todosLoader(queryClient),
        lazy: async () => {
          const Todos = (await import("./routes/todos/all-todos/Todos"))
            .default;
          return { Component: Todos };
        },
      },
    ],
  },
  {
    element: <RequireLogin />,
    children: [
      {
        path: "secret",
        element: <Secret />,
      },
    ],
  },
]);

export default router;
