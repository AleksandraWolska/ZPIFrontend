import { createBrowserRouter } from "react-router-dom";
import { queryClient } from "./query";
import Home from "./routes/home/Home";
import RequireLogin from "./auth/RequireLogin";
import Secret from "./routes/secret/Secret";
import UserAppMainPage from "./routes/userapp/main-page/UserAppMainPage";
import { loader as userAppMainPageLoader } from "./routes/userapp/main-page/loader";
import ItemDetailsPage from "./routes/userapp/details-page/ItemDetailsPage";
import UserAppWrapper from "./routes/userapp/wrapper/UserAppWrapper";
import { loader as userAppWrapperLoader } from "./routes/userapp/wrapper/loader";
import { loader as detailsPageLoader } from "./routes/userapp/details-page/loader";
import { loader as itemListLoader } from "./routes/admin/items/item-list/loader";
import { loader as editItemLoader } from "./routes/admin/items/edit-item/loader";
import { loader as storeLoader } from "./routes/admin/store/loader";
import { loader as reservationsLoader } from "./routes/admin/reservations/loader";
import { loader as userReservationsPageLoader } from "./routes/userapp/user-reservations/loader";
import { loader as adminMainPageLoader } from "./routes/admin/admin-main-page/loader";
import UserReservationsPage from "./routes/userapp/user-reservations/UserReservationsPage";
import AuthErrorBoundary from "./auth/AuthErrorBoundary";

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
    path: "admin",
    lazy: async () => {
      const AdminAppWrapper = (
        await import("./routes/admin/admin-app-wrapper/AdminAppWrapper")
      ).default;
      return { Component: AdminAppWrapper };
    },
    children: [
      {
        element: <RequireLogin />,
        errorElement: <AuthErrorBoundary />,
        children: [
          {
            index: true,
            loader: adminMainPageLoader(queryClient),
            lazy: async () => {
              const AdminMainPage = (
                await import("./routes/admin/admin-main-page/AdminMainPage")
              ).default;
              return { Component: AdminMainPage };
            },
          },
          {
            path: "new",
            lazy: async () => {
              const StoreConfigWizard = (
                await import(
                  "./routes/admin/store-config-wizard/StoreConfigWizard"
                )
              ).default;
              return { Component: StoreConfigWizard };
            },
          },
          {
            path: ":storeId",
            loader: storeLoader(queryClient),
            children: [
              {
                index: true,
                lazy: async () => {
                  const Store = (await import("./routes/admin/store/Store"))
                    .default;
                  return { Component: Store };
                },
              },
              {
                path: "item-list",
                loader: itemListLoader(queryClient),
                lazy: async () => {
                  const ItemList = (
                    await import("./routes/admin/items/item-list/ItemList")
                  ).default;
                  return { Component: ItemList };
                },
              },
              {
                path: "item-list/:itemId/edit",
                loader: editItemLoader(queryClient),
                lazy: async () => {
                  const EditItem = (
                    await import("./routes/admin/items/edit-item/EditItem")
                  ).default;
                  return { Component: EditItem };
                },
              },
              {
                path: "item-list/:itemId/reschedule",
                loader: editItemLoader(queryClient),
                lazy: async () => {
                  const RescheduleItem = (
                    await import(
                      "./routes/admin/items/edit-item/RescheduleItem"
                    )
                  ).default;
                  return { Component: RescheduleItem };
                },
              },
              {
                path: "add-item",
                lazy: async () => {
                  const NewItem = (
                    await import("./routes/admin/items/add-item/AddItem")
                  ).default;
                  return { Component: NewItem };
                },
              },
              {
                path: "reservations",
                loader: reservationsLoader(queryClient),
                lazy: async () => {
                  const Reservations = (
                    await import("./routes/admin/reservations/Reservations")
                  ).default;
                  return { Component: Reservations };
                },
              },
            ],
          },
        ],
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
      {
        path: "reservations",
        element: <RequireLogin />,
        children: [
          {
            path: "",
            element: <UserReservationsPage />,
            loader: userReservationsPageLoader(queryClient),
          },
        ],
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
