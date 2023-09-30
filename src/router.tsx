import { createBrowserRouter } from "react-router-dom";
import { queryClient } from "./query";
import { loader as todosLoader } from "./routes/todos/all-todos/loader";
import Home from "./routes/home/Home";
import RequireLogin from "./auth/RequireLogin";
import Secret from "./routes/secret/Secret";
import UserAppMainPage from "./routes/userapp/main-page/UserAppMainPage";
import { loader as userAppMainPageLoader } from "./routes/userapp/main-page/loader";
import ItemDetailsPage from "./routes/userapp/details-page/ItemDetailsPage";
import UserAppWrapper from "./routes/userapp/wrapper/UserAppWrapper";
import { loader as userAppWrapperLoader } from "./routes/userapp/wrapper/loader";
import { loader as detailsPageLoader } from "./routes/userapp/details-page/loader";

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
    path: "store-config-wizard",
    lazy: async () => {
      const StoreConfigWizard = (
        await import("./routes/store-config-wizard/StoreConfigWizard")
      ).default;
      return { Component: StoreConfigWizard };
    },
  },
  {
    path: "items/new",
    lazy: async () => {
      const NewItem = (await import("./routes/items/NewItem")).default;
      return { Component: NewItem };
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
    path: "userapp/:storeId",
    element: <UserAppWrapper />,
    loader: userAppWrapperLoader(queryClient),
    children: [
      {
        index: true,
        element: <UserAppMainPage />,
        loader: userAppMainPageLoader(queryClient),
      },
      {
        path: ":itemId",
        element: <ItemDetailsPage />,
        loader: detailsPageLoader(queryClient),
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
