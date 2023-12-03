import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { BACKEND_URL, queryClient } from "../../../query";
import { getAccessToken } from "../../../auth/utils";

const deleteReservation = (reservationId: string, storeId: string) => {
  const token = getAccessToken();

  return fetch(
    `${BACKEND_URL}/stores/${storeId}/reservations/${reservationId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

function useDeleteReservation() {
  const { storeId } = useParams() as { storeId: string };

  return useMutation({
    mutationFn: (reservationId: string) => {
      return deleteReservation(reservationId, storeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userReservationList", storeId]);
    },
  });
}

export default useDeleteReservation;
