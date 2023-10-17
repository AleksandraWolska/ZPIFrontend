import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCommentsListQuery } from "./loader";
import { CommentList } from "../types";

function useCommentList() {
  const params = useParams() as { storeId: string; itemId: string };

  const { data, refetch } = useQuery(
    getCommentsListQuery(params.storeId, params.itemId),
  ) as {
    data: CommentList;
    refetch: () => void;
  };

  return { data, refetch };
}

export default useCommentList;
