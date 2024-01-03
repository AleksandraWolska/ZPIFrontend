import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation, useParams } from "react-router-dom";
import { TextField, Button, Dialog, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
      <Typography variant="h6">
        {t("user.components.details.ratingTitle")}
      </Typography>
      {showRatings && (
        <Box display="flex" marginTop="5px" marginBottom="5px">
          <RatingsInteractive handleSetRating={handleRatingAdd} />
        </Box>
      )}
      {showComments && (
        <>
          <TextField
            inputProps={{ maxLength: 1000 }}
            margin="dense"
            fullWidth
            label={t("user.components.details.commentLabel")}
            name="comment-input"
            variant="outlined"
            multiline
            rows={2}
            placeholder={t("user.components.details.commentPlaceholder")}
            value={newComment.content}
            onChange={(e) =>
              setNewComment((prev) => ({ ...prev, content: e.target.value }))
            }
          />
          <TextField
            inputProps={{ maxLength: 255 }}
            margin="dense"
            fullWidth
            label={t("user.components.details.nickLabel")}
            name="nick-input"
            variant="outlined"
            placeholder={t("user.components.details.nickPlaceholder")}
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
          {t("common.cancel")}
        </Button>
        <Button variant="contained" onClick={handleVerifyComment}>
          {t("common.send")}
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
          {showComments
            ? t("user.components.details.addReview")
            : t("user.components.details.rate")}
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
          {showComments
            ? t("user.components.details.logInToAddReview")
            : t("user.components.details.logInToRate")}
        </Button>
      )}
    </Box>
  );
}

export default CommentInput;
