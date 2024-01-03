import { useMutation } from "react-query";

// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NewReservation } from "../../../types";
import { BACKEND_URL, queryClient } from "../../../query";

function useReserveItem() {
  const params = useParams() as { storeId: string };
  // const navigate = useNavigate();
  const mutation = useMutation(
    (data: NewReservation) =>
      fetch(
        `${
          process.env.NODE_ENV === "development"
            ? `/api/reserve`
            : `${BACKEND_URL}/stores/${params.storeId}/reservations/reserve`
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      ).then((res) => {
        if (!res.ok) throw new Error("Reservation failed");
        return res.json();
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("itemDetails");
        // navigate("../");
      },
    },
  );

  return mutation;
}

export default useReserveItem;
