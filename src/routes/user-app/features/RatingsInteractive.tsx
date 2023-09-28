import { Box, Rating } from "@mui/material";
import { SyntheticEvent, useState } from "react";

type RatingsInteractiveProps = {
  handleSetRating: (rating: number) => void;
};

function RatingsInteractive({ handleSetRating }: RatingsInteractiveProps) {
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const handleChange = (_event: SyntheticEvent, newValue: number | null) => {
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
