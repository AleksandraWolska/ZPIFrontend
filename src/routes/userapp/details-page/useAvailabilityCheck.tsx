import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { CheckAvailabilityRequest } from "../types";
import { BACKEND_URL } from "../../../query";

function useAvailabilityCheck() {
  const params = useParams() as { storeId: string };
  const mutation = useMutation((data: CheckAvailabilityRequest) =>
    fetch(
      `${
        process.env.NODE_ENV === "development"
          ? `/api/check-availability`
          : `${BACKEND_URL}/stores/${params.storeId}/reservations/check`
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    ).then((res) => {
      if (!res.ok) throw new Error("Availability check failed");
      return res.json();
    }),
  );

  return mutation;
}

export default useAvailabilityCheck;
