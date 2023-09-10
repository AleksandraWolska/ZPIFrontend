import { Box, Rating } from "@mui/material";
import { useState } from "react";

function RatingsInteractive(
  mark: number,
  handleSetRating: (rating: number) => void,
) {
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number | null,
  ) => {
    setRatingValue(newValue);
    handleSetRating(newValue!);
  };

  return (
    <Box>
      <Rating
        name="input-rating"
        value={ratingValue}
        precision={0.5}
        onChange={handleChange}
      />
    </Box>
  );
}

export default RatingsInteractive;
