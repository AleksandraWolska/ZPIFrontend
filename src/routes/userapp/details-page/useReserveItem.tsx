import { useMutation } from "react-query";

// import { useNavigate } from "react-router-dom";
import { NewReservation } from "../../../types";
import { BACKEND_URL, queryClient } from "../../../query";
import { getAccessToken } from "../../../auth/utils";

function useReserveItem() {
  // const navigate = useNavigate();
  const token = getAccessToken();
  const mutation = useMutation(
    (data: NewReservation) =>
      fetch(
        `${
          process.env.NODE_ENV === "development"
            ? `/api/reserve`
            : `${BACKEND_URL}/reserve`
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        // navigate(-1);
      },
    },
  );

  return mutation;
}

export default useReserveItem;
