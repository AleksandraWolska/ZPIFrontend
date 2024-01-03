import { createBrowserRouter } from "react-router-dom";
import { queryClient } from "./query";
import RequireLogin from "./auth/RequireLogin";
import { loader as userAppMainPageLoader } from "./routes/user-app/main-page/loader";
import Home from "./routes/home/Home";
import { loader as userAppWrapperLoader } from "./routes/user-app/wrapper/loader";
import { loader as detailsPageLoader } from "./routes/user-app/details-page/loader";
import { loader as itemListLoader } from "./routes/admin/items/item-list/loader";
import { loader as editItemLoader } from "./routes/admin/items/edit-item/loader";
import { loader as storeLoader } from "./routes/admin/store/loader";
import { loader as reservationsLoader } from "./routes/admin/reservations/loader";
import { loader as userReservationsPageLoader } from "./routes/user-app/user-reservations/loader";
import { loader as adminMainPageLoader } from "./routes/admin/admin-main-page/loader";
import { loader as allStoresLoader } from "./routes/home/loader";
import AuthErrorBoundary from "./auth/AuthErrorBoundary";
import NotFoundPage from "./shared-components/NotFoundPage";
import GlobalLoadingIndicator from "./shared-components/GlobalLoadingIndicator";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: allStoresLoader(queryClient),
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
            element: <GlobalLoadingIndicator />,
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
                  const NewStore = (
                    await import("./routes/admin/new-store/NewStore")
                  ).default;
                  return { Component: NewStore };
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
                  {
                    path: "settings",
                    lazy: async () => {
                      const StoreSettings = (
                        await import(
                          "./routes/admin/store-settings/StoreSettings"
                        )
                      ).default;
                      return { Component: StoreSettings };
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: ":storeId",
    lazy: async () => {
      const UserAppWrapper = (
        await import("./routes/user-app/wrapper/UserAppWrapper")
      ).default;
      return { Component: UserAppWrapper };
    },
    loader: userAppWrapperLoader(queryClient),
    children: [
      {
        element: <GlobalLoadingIndicator />,
        children: [
          {
            index: true,
            lazy: async () => {
              const UserAppMainPage = (
                await import("./routes/user-app/main-page/UserAppMainPage")
              ).default;
              return { Component: UserAppMainPage };
            },
            loader: userAppMainPageLoader(queryClient),
          },
          {
            path: ":itemId",
            lazy: async () => {
              const ItemDetailsPage = (
                await import("./routes/user-app/details-page/ItemDetailsPage")
              ).default;
              return { Component: ItemDetailsPage };
            },
            loader: detailsPageLoader(queryClient),
          },
          {
            path: "reservations",
            element: <RequireLogin />,
            errorElement: <AuthErrorBoundary />,
            children: [
              {
                index: true,
                lazy: async () => {
                  const UserReservationsPage = (
                    await import(
                      "./routes/user-app/user-reservations/UserReservationsPage"
                    )
                  ).default;
                  return { Component: UserReservationsPage };
                },
                loader: userReservationsPageLoader(queryClient),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
    loader: allStoresLoader(queryClient),
  },
]);

export default router;
