import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation, useParams } from "react-router-dom";
import { TextField, Button, Dialog, Typography, Box } from "@mui/material";
import RatingsInteractive from "./RatingsInteractive";
import { NewComment } from "../../types";

type CommentInputProps = {
  handleSendComment: (content: NewComment) => void;
  showComments: boolean;
  showRatings: boolean;
};

function CommentInput({
  handleSendComment,
  showComments,
  showRatings,
}: CommentInputProps) {
  const [isCommentInputVisible, setIsCommentInputVisible] = useState(false);
  const params = useParams() as { itemId: string };

  const auth = useAuth();
  const location = useLocation();

  const initialState: NewComment = {
    nickname: "",
    content: "",
    rating: undefined,
    datetime: "", // This will be set just before sending
    itemId: "",
  };

  const [newComment, setNewComment] = useState<NewComment>(initialState);

  const handleRatingAdd = (rating: number) => {
    setNewComment((prev) => ({ ...prev, rating }));
  };

  const handleVerifyComment = () => {
    if (newComment.content?.trim() !== "" || newComment.rating !== undefined) {
      const datetime = new Date().toISOString();
      const { itemId } = params;
      handleSendComment({ ...newComment, datetime, itemId });
      setNewComment(initialState);
      setIsCommentInputVisible(false); // Hide comment input after sending.
    }
  };

  const handleCancel = () => {
    setNewComment(initialState);
    setIsCommentInputVisible(false); // Hide comment input form
  };

  const content = (
    <Box>
      <Typography variant="h6">Tell us how did you like it </Typography>
      {showRatings && (
        <Box display="flex" marginTop="5px" marginBottom="5px">
          <RatingsInteractive handleSetRating={handleRatingAdd} />
        </Box>
      )}
      {showComments && (
        <>
          <TextField
            margin="dense"
            fullWidth
            label="Your Comment"
            variant="outlined"
            multiline
            rows={2}
            placeholder="Enter your comment here..."
            value={newComment.content}
            onChange={(e) =>
              setNewComment((prev) => ({ ...prev, content: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            fullWidth
            label="Optional nick"
            variant="outlined"
            placeholder="Enter optional nickname..."
            value={newComment.nickname}
            onChange={(e) =>
              setNewComment((prev) => ({ ...prev, nickname: e.target.value }))
            }
          />
        </>
      )}

      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleVerifyComment}>
          Send
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      {isCommentInputVisible && (
        <Dialog onClose={handleCancel} fullWidth open>
          <Box padding="20px">{content}</Box>
        </Dialog>
      )}
      {auth.isAuthenticated ? (
        <Button
          variant="outlined"
          color="primary"
          style={{ marginBottom: 15 }}
          onClick={() => setIsCommentInputVisible(true)}
        >
          {showComments ? "Add review" : "Rate"}
        </Button>
      ) : (
        <Button
          variant="outlined"
          style={{ marginBottom: 15 }}
          onClick={() => {
            const currentPath = location.pathname + location.search;
            auth.signinRedirect({
              redirect_uri: `${window.location.origin}${currentPath}`,
            });
          }}
        >
          Log in to {showComments ? "add review" : "rate"}
        </Button>
      )}
    </Box>
  );
}

export default CommentInput;
