import { useMutation } from "react-query";
import { getAccessToken } from "../../../auth/utils";
import { queryClient } from "../../../query";

const confirmReservation = (reservationId: string) => {
  const token = getAccessToken();

  return fetch(`/api/admin/reservations/${reservationId}/confirm`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

function useConfirmReservation() {
  return useMutation({
    mutationFn: (reservationId: string) => {
      return confirmReservation(reservationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-reservations"]);
    },
  });
}

export default useConfirmReservation;
