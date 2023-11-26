import { useMutation } from "react-query";
import { FetchScheduleRequest } from "../types";
import { BACKEND_URL } from "../../../query";

function useSchedule() {
  const mutation = useMutation((data: FetchScheduleRequest) =>
    fetch(
      `${
        process.env.NODE_ENV === "development"
          ? `/api/fetch-schedule`
          : `${BACKEND_URL}/fetch-schedule` // TODO: NONEXISTENT in backend
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
