import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getReservationsQuery } from "./loader";
import { Reservation } from "../../../types";

function useReservations() {
  const { storeId } = useParams() as { storeId: string };

  const { data } = useQuery(getReservationsQuery(storeId)) as {
    data: Reservation[];
  };

  return data;
}

export default useReservations;
