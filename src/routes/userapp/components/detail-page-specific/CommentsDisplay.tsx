import {
  List,
  Paper,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { Comment } from "../../../../types";
import useCommentList from "../../details-page/useCommentList";
import Ratings from "../shared/Ratings";

function CommentsDisplay() {
  const { data: comments } = useCommentList();

  return (
    <List>
      {comments.map((comment: Comment) => (
        <Paper style={{ padding: 15, marginBottom: 15 }}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Typography
                    sx={{ marginRight: 1 }}
                    variant="body1"
                    color="textPrimary"
                  >
                    {comment.nickname ? comment.nickname : "anonymous"}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {` — ${new Date(comment.datetime).toLocaleDateString()}`}
                  </Typography>
                </Box>
              }
              secondary={
                <Box>
                  {comment.rating && <Ratings mark={comment.rating} />}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    {comment.content}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}

export default CommentsDisplay;
