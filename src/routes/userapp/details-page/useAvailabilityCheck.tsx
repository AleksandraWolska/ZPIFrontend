import { useMutation } from "react-query";
import { CheckAvailabilityRequest } from "../types";

function useAvailabilityCheck() {
  const mutation = useMutation((data: CheckAvailabilityRequest) =>
    fetch(`/api/check-availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) throw new Error("Availability check failed");
      return res.json();
    }),
  );

  return mutation;
}

export default useAvailabilityCheck;
