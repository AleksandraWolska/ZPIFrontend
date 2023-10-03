import { useState } from "react";
import {
  TextField,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Comment } from "../../../types";
import { CommentList } from "../types";
import useCommentList from "../details-page/useCommentList";

type CommentComponentProps = {
  handleSendComment: (content: string) => void;
};

function CommentComponent({ handleSendComment }: CommentComponentProps) {
  const comments: CommentList = useCommentList();
  const [userCommentValue, setUserCommentValue] = useState("");

  const handleVerifyComment = () => {
    if (userCommentValue.trim() !== "") {
      handleSendComment(userCommentValue);
      setUserCommentValue("");
    }
  };

  return (
    <div>
      <Paper style={{ padding: 15, marginBottom: 15 }}>
        <TextField
          fullWidth
          label="Your Comment"
          variant="outlined"
          multiline
          rows={2}
          placeholder="Enter your comment here..."
          value={userCommentValue}
          onChange={(e) => setUserCommentValue(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
          onClick={handleVerifyComment}
        >
          Send
        </Button>
      </Paper>
      <List>
        {comments.map((comment: Comment) => (
          <Paper style={{ padding: 15, marginBottom: 15 }}>
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemText
                primary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body1"
                      color="textPrimary"
                    >
                      {comment.nickname}
                    </Typography>
                    {` — ${new Date(comment.datetime).toLocaleDateString(
                      undefined,
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}`}
                  </>
                }
                secondary={comment.content}
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </div>
  );
}

export default CommentComponent;
