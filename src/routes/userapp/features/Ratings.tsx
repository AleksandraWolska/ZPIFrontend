import { Box, Rating } from "@mui/material";

interface Props {
  mark: number;
}
function Ratings({ mark }: Props) {
  return (
    <Box>
      <Rating name="read-only" value={mark} precision={0.5} readOnly />
    </Box>
  );
}

export default Ratings;
