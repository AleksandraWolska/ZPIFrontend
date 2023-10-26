import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { UserReservation } from "../types";
import { getUserReservationListQuery } from "./loader";

function useUserReservedItems() {
  const params = useParams() as { storeId: string; itemId: string };

  const { data, refetch } = useQuery(
    getUserReservationListQuery(params.storeId, params.itemId),
  ) as {
    data: UserReservation[];
    refetch: () => void;
  };

  return { data, refetch };
}

export default useUserReservedItems;
