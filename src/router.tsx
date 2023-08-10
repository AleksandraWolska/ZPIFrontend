import { createBrowserRouter } from "react-router-dom";
import { queryClient } from "./query";
import { Todos, todosLoader } from "./routes/todos";
import { Home } from "./routes/home";

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
        element: <Todos />,
        loader: todosLoader(queryClient),
      },
    ],
  },
]);

export default router;
