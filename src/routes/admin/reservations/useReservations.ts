import { useQuery } from "react-query";
import { getReservationsQuery } from "./loader";
import { Reservation } from "../../../types";

function useReservations() {
  const { data } = useQuery(getReservationsQuery()) as { data: Reservation[] };

  return data;
}

export default useReservations;
