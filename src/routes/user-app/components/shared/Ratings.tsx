import { Box, Rating, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type RatingsProps = {
  mark: number;
  ratingCount?: number;
};

function Ratings({ mark, ratingCount }: RatingsProps) {
  const { t } = useTranslation();

  return (
    <Box display="flex">
      <Rating name="read-only" value={mark} precision={0.5} readOnly />

      {ratingCount !== undefined && (
        <Typography sx={{ ml: 0.5 }}>
          ({ratingCount || t("user.details.noReviews")})
        </Typography>
      )}
    </Box>
  );
}

export default Ratings;
