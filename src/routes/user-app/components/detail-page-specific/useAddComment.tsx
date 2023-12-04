import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { BACKEND_URL, queryClient } from "../../../../query";
import { NewComment } from "../../types";
import { getAccessToken } from "../../../../auth/utils";

const addComment = (itemId: string, newComment: NewComment) => {
  const token = getAccessToken();
  return fetch(`${BACKEND_URL}/items/${itemId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  });
};

function useAddComment() {
  const params = useParams() as { storeId: string; itemId: string };

  return useMutation({
    mutationFn: (newComment: NewComment) => {
      return addComment(params.itemId, newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "itemDetails",
        params.storeId,
        params.itemId,
      ]);
    },
  });
}

export default useAddComment;
