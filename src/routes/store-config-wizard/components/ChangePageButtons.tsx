import { Button, Stack } from "@mui/material";

function ChangePageButtons({
  onPrev,
  onNext,
}: {
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <Stack direction="row" spacing={1}>
      {onPrev && (
        <Button onClick={onPrev} variant="outlined">
          Prev
        </Button>
      )}
      {onNext && (
        <Button onClick={onNext} variant="contained">
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
