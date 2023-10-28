import { Box, Button, Stack } from "@mui/material";
import {
  changePageButton,
  changePageButtonContainer,
} from "../routes/store-config-wizard/steps/commonStyles";

function ChangePageButtons({
  onPrev,
  onNext,
}: {
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <Box sx={changePageButtonContainer}>
      {onPrev && (
        <Button sx={changePageButton} onClick={onPrev} variant="outlined">
          Prev
        </Button>
      )}
      {onNext && (
        <Button sx={changePageButton} onClick={onNext} variant="contained">
          Next
        </Button>
      )}
    </Box>
  );
}

ChangePageButtons.defaultProps = {
  onPrev: null,
  onNext: null,
};

export default ChangePageButtons;
