import { Button, Stack } from "@mui/material";
import { styled } from "@mui/system";

const ChangePageButton = styled(Button)(({ theme }) => ({
  flexGrow: 1,
  margin: theme.spacing(1.125),
}));

function ChangePageButtons({
  onPrev,
  onNext,
}: {
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <Stack direction="row" width="100%">
      {onPrev && (
        <ChangePageButton onClick={onPrev} variant="outlined">
          Prev
        </ChangePageButton>
      )}
      {onNext && (
        <ChangePageButton onClick={onNext} variant="contained">
          Next
        </ChangePageButton>
      )}
    </Stack>
  );
}

ChangePageButtons.defaultProps = {
  onPrev: null,
  onNext: null,
};

export default ChangePageButtons;
