import { Button, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <Stack direction="row" width="100%">
      {onPrev && (
        <ChangePageButton onClick={onPrev} variant="outlined">
          {t("admin.wizard.prev")}
        </ChangePageButton>
      )}
      {onNext && (
        <ChangePageButton onClick={onNext} variant="contained">
          {t("admin.wizard.next")}
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
