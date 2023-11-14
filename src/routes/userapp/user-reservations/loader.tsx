import { QueryClient } from "react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";
import { UserReservation } from "../types";

export const getUserReservationListQuery = (
  storeId: string,
  userId: string,
) => ({
  queryKey: ["userReservationList", storeId, userId],
  queryFn: async () => fetchUserReservationList(storeId, userId),
});

const fetchUserReservationList = async (
  storeId: string,
  userId: string,
): Promise<UserReservation[]> => {
  const res = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? `/api/store/${storeId}/user/${userId}/reservations`
        : `https://zpibackend.fly.dev/store/${storeId}/user/${userId}/reservations`
    }`,
  );
  return res.json();
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId, itemId } = params as { storeId: string; itemId: string };

    const userReservationListQuery = getUserReservationListQuery(
      storeId,
      itemId,
    );
    const userReservationList = new Promise((resolve) => {
      resolve(
        queryClient.getQueryData(userReservationListQuery.queryKey) ??
          queryClient.fetchQuery(userReservationListQuery),
      );
    });

    return defer({
      userReservationList: await userReservationList,
    });
  };
