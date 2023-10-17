import {
  List,
  Paper,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import { Comment } from "../../../../types";
import useCommentList from "../../details-page/useCommentList";
import Ratings from "../shared/Ratings";

type CommentsDisplayProps = {
  shouldRefetch: boolean;
};

function CommentsDisplay({ shouldRefetch }: CommentsDisplayProps) {
  const { data: comments, refetch } = useCommentList();

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
    }
  }, [shouldRefetch, refetch]);

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
                    component="span"
                    variant="body1"
                    color="textPrimary"
                  >
                    {comment.nickname ? comment.nickname : "anonymous"}
                  </Typography>
                  <Typography
                    component="span"
                    variant="caption"
                    color="textSecondary"
                  >
                    {` — ${new Date(comment.datetime).toLocaleDateString(
                      undefined,
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}`}
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
