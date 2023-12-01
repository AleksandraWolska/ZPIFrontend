import { Button, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

export type PageButtonsDisableStatus = "prev" | "next" | "both" | false;

const ChangePageButton = styled(Button)(({ theme }) => ({
  flexGrow: 1,
  margin: theme.spacing(1.125),
}));

function ChangePageButtons({
  onPrev,
  onNext,
  disabled,
}: {
  onPrev?: () => void;
  onNext?: () => void;
  disabled?: PageButtonsDisableStatus;
}) {
  const { t } = useTranslation();

  return (
    <Stack direction="row" width="100%">
      {onPrev && (
        <ChangePageButton
          onClick={onPrev}
          variant="outlined"
          disabled={disabled === "prev" || disabled === "both"}
        >
          {t("admin.wizard.prev")}
        </ChangePageButton>
      )}
      {onNext && (
        <ChangePageButton
          onClick={onNext}
          variant="contained"
          disabled={disabled === "next" || disabled === "both"}
        >
          {t("admin.wizard.next")}
        </ChangePageButton>
      )}
    </Stack>
  );
}

ChangePageButtons.defaultProps = {
  onPrev: null,
  onNext: null,
  disabled: false,
};

export default ChangePageButtons;
