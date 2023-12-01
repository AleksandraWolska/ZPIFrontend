import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { FetchScheduleRequest } from "../types";
import { BACKEND_URL } from "../../../query";

function useSchedule() {
  const params = useParams() as { storeId: string };
  const mutation = useMutation((data: FetchScheduleRequest) =>
    fetch(
      `${
        process.env.NODE_ENV === "development"
          ? `/api/fetch-schedule`
          : `${BACKEND_URL}/stores/${params.storeId}/reservations/refetch` // TODO: NONEXISTENT in backend
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    ).then((res) => {
      if (!res.ok) throw new Error("Schedule fetch failed");
      return res.json();
    }),
  );

  return mutation;
}

export default useSchedule;
