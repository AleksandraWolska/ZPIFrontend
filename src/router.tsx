import { createBrowserRouter } from "react-router-dom";
import { queryClient } from "./query";
import Home from "./routes/home/Home";
import { loader as todosLoader } from "./routes/todos/all-todos/loader";
import RequireLogin from "./auth/RequireLogin";
import Secret from "./routes/secret/Secret";
import Schedule from "./routes/calendar/Schedule";

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
    path: "schemas/new",
    lazy: async () => {
      const NewSchema = (await import("./routes/schemas/NewSchema")).default;
      return { Component: NewSchema };
    },
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
  {
    path: "schedule",
    element: <Schedule />,
  },
]);

export default router;
