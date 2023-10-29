import { Button, Stack } from "@mui/material";
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
    <Stack sx={changePageButtonContainer}>
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
    </Stack>
  );
}

ChangePageButtons.defaultProps = {
  onPrev: null,
  onNext: null,
};

export default ChangePageButtons;
