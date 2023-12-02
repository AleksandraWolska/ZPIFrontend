import { Box, Rating, Typography } from "@mui/material";

type RatingsProps = {
  mark: number;
  ratingCount?: number;
};
function Ratings({ mark, ratingCount }: RatingsProps) {
  return (
    <Box display="flex">
      <Rating name="read-only" value={mark} precision={0.5} readOnly />

      {ratingCount !== undefined && (
        <Typography sx={{ ml: 0.5 }}>({ratingCount || "brak ocen"})</Typography>
      )}
    </Box>
  );
}

export default Ratings;
