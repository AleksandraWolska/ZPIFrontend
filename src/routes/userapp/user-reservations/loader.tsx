import { QueryClient } from "react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";
import { UserReservation } from "../types";
import { BACKEND_URL } from "../../../query";
import { getAccessToken } from "../../../auth/utils";

export const getUserReservationListQuery = (storeId: string) => ({
  queryKey: ["userReservationList", storeId],
  queryFn: async () => fetchUserReservationList(storeId),
});

const fetchUserReservationList = async (
  storeId: string,
): Promise<UserReservation[]> => {
  const token = getAccessToken();
  const res = await fetch(
    `${BACKEND_URL}/stores/${storeId}/reservations/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { storeId } = params as { storeId: string };

    const userReservationListQuery = getUserReservationListQuery(storeId);
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
