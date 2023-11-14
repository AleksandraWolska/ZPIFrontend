import { QueryClient } from "react-query";
import { LoaderFunctionArgs, useParams } from "react-router-dom";
import { getAccessToken } from "../../../auth/utils";
import { Reservation } from "../../../types";
import { BACKEND_URL } from "../../../query";

import { getItemQuery } from "../queries/item";

const fetchReservations = async (): Promise<Reservation[]> => {
  const token = getAccessToken();

  const res = await fetch(`${BACKEND_URL}/api/admin/reservations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const getReservationsQuery = () => ({
  queryKey: ["admin-reservations"],
  queryFn: () => fetchReservations(),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const reservationsQuery = getReservationsQuery();
    const reservations: Reservation[] =
      queryClient.getQueryData(reservationsQuery.queryKey) ??
      (await queryClient.fetchQuery(reservationsQuery));

    const itemsQueries = reservations.map((reservation) => {
      const { storeId } = params as { storeId: string };
      const query = getItemQuery(reservation.itemId, storeId);
      return new Promise((resolve) => {
        resolve(
          queryClient.getQueryData(query.queryKey) ??
            queryClient.fetchQuery(query),
        );
      });
    });

    const items = await Promise.all(itemsQueries);

    return {
      reservations,
      items,
    };
  };
