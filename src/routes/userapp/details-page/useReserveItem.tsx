import { useMutation } from "react-query";
import { ReservationRequest } from "../types";

function useReserveItem() {
  const mutation = useMutation((data: ReservationRequest) =>
    fetch(`/api/reserve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) throw new Error("Reservation failed");
      return res.json();
    }),
  );

  return mutation;
}

export default useReserveItem;
