import { useMutation } from "react-query";
import { FetchScheduleRequest } from "../types";

function useSchedule() {
  const mutation = useMutation((data: FetchScheduleRequest) =>
    fetch(`/api/fetch-schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) throw new Error("Schedule fetch failed");
      return res.json();
    }),
  );

  return mutation;
}

export default useSchedule;
