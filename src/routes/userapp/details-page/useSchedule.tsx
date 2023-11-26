import { useMutation } from "react-query";
import { FetchScheduleRequest } from "../types";
import { BACKEND_URL } from "../../../query";
import { getAccessToken } from "../../../auth/utils";

function useSchedule() {
  const token = getAccessToken();
  const mutation = useMutation((data: FetchScheduleRequest) =>
    fetch(
      `${
        process.env.NODE_ENV === "development"
          ? `/api/fetch-schedule`
          : `${BACKEND_URL}/fetch-schedule`
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
      if (!res.ok) throw new Error("Schedule fetch failed");
      return res.json();
    }),
  );

  return mutation;
}

export default useSchedule;
