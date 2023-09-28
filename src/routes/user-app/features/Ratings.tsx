import { Box, Rating } from "@mui/material";

type RatingsProps = {
  mark: number;
};
function Ratings({ mark }: RatingsProps) {
  return (
    <Box>
      <Rating name="read-only" value={mark} precision={0.5} readOnly />
    </Box>
  );
}

export default Ratings;
