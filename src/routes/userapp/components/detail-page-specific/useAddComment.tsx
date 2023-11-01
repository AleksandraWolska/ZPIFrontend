import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../../../../query";
import { Comment } from "../../../../types";

const addComment = (storeId: string, newComment: Comment) => {
  // no such path in mock
  return fetch(`/api/stores/${storeId}/commentadd`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  });
};

function useAddComment() {
  const params = useParams() as { storeId: string; itemId: string };

  return useMutation({
    mutationFn: (newComment: Comment) => {
      return addComment(params.storeId, newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "commentsList",
        params.storeId,
        params.itemId,
      ]);
    },
  });
}

export default useAddComment;
