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
import { Item, Comment as CommentType } from "../mocks/userapp_types";

interface CommentListProps {
  selectedItem: Item;
  handleSendComment: (content: string) => void;
}

function CommentList({ selectedItem, handleSendComment }: CommentListProps) {
  const [userComment, setUserComment] = useState("");

  const handleVerifyComment = () => {
    if (userComment.trim() !== "") {
      handleSendComment(userComment);
      setUserComment("");
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
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
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
        {selectedItem &&
          selectedItem.commentList &&
          selectedItem.commentList.map((comment: CommentType) => (
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

export default CommentList;
