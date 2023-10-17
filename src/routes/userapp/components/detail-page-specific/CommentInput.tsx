import { useState } from "react";
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

  const initialState: NewComment = {
    nickname: "",
    content: "",
    rating: undefined,
    datetime: "", // This will be set just before sending
  };

  const [newComment, setNewComment] = useState<NewComment>(initialState);

  const handleRatingAdd = (rating: number) => {
    setNewComment((prev) => ({ ...prev, rating }));
  };

  const handleVerifyComment = () => {
    if (newComment.content?.trim() !== "" || newComment.rating !== undefined) {
      const datetime = new Date().toISOString();
      handleSendComment({ ...newComment, datetime });
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerifyComment}
        >
          Send
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Box>
  );

  return (
    <div>
      {isCommentInputVisible ? (
        //   <Paper style={{ padding: 15, marginBottom: 15 }}>{content}</Paper>
        <Dialog onClose={handleCancel} fullWidth open>
          <Box padding="20px">{content}</Box>
        </Dialog>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          style={{ marginBottom: 15 }}
          onClick={() => setIsCommentInputVisible(true)}
        >
          {showComments ? "Add comment" : "Rate"}
        </Button>
      )}
    </div>
  );
}

export default CommentInput;
