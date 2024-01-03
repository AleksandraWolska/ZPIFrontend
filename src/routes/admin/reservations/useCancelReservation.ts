import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../../../auth/utils";
import { BACKEND_URL, queryClient } from "../../../query";

const cancelReservation = (storeId: string, reservationId: string) => {
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

function useCancelReservation() {
  const { storeId } = useParams() as { storeId: string };

  return useMutation({
    mutationFn: (reservationId: string) => {
      return cancelReservation(storeId, reservationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-reservations"]);
    },
  });
}

export default useCancelReservation;
