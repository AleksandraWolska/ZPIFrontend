import { createBrowserRouter } from "react-router-dom";
import { queryClient } from "./query";
import Home from "./routes/home/Home";
import { loader as todosLoader } from "./routes/todos/loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/todos",
    children: [
      {
        index: true,
        loader: todosLoader(queryClient),
        lazy: async () => {
          const Todos = (await import("./routes/todos/Todos")).default;
          return { Component: Todos };
        },
      },
    ],
  },
]);

export default router;
