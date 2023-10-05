import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCommentsListQuery } from "./loader";
import { CommentList } from "../types";

function useAvailabilityCheck() {
  const params = useParams() as { storeId: string; itemId: string };

  const { data } = useQuery(
    getCommentsListQuery(params.storeId, params.itemId),
  ) as {
    data: CommentList;
  };

  return data;
}

export default useAvailabilityCheck;
