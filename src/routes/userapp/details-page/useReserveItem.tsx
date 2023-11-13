import { useMutation } from "react-query";

// import { useNavigate } from "react-router-dom";
import { NewReservation } from "../../../types";
import { queryClient } from "../../../query";

function useReserveItem() {
  // const navigate = useNavigate();
  const mutation = useMutation(
    (data: NewReservation) =>
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
    {
      onSuccess: () => {
        queryClient.invalidateQueries("itemDetails");
        // navigate(-1);
      },
    },
  );

  return mutation;
}

export default useReserveItem;
