import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { useStoreConfig } from "../StoreConfigProvider";
import StepContentWrapper from "./components/StepContentWrapper";
import useAddStoreConfig, {
  removeIdsFromStoreConfig,
} from "../../new-store/useAddStoreConfig";
import WizardStepTitle from "./components/WizardStepTitle";
import BackButton from "./components/BackButton";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { calculateProgress } from "./utils";

function Summary({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { t } = useTranslation();

  const { storeConfig } = useStoreConfig();
  const addStoreConfig = useAddStoreConfig();
  const navigate = useNavigate();
  const isValid = storeConfig.owner.name !== "";

  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => {
          const nextStep = STORE_CONFIG_STEPS.DETAILS_PAGE;
          setActiveStep(nextStep);
          setProgress(calculateProgress(STORE_CONFIG_STEPS.SUMMARY, nextStep));
        }}
      />

      <WizardStepTitle>{t("admin.wizard.summary.title")}</WizardStepTitle>

      {isValid ? (
        <>
          <Box sx={{ margin: 1 }}>
            {/* <CheckCircleOutlineIcon sx={{ fontSize: "5rem", color: "grey" }} /> */}
            <DownloadDoneIcon sx={{ fontSize: "5rem", color: "grey" }} />
          </Box>
          <Typography sx={{ textAlign: "center", margin: 1 }}>
            {t("admin.wizard.summary.desc1")}
          </Typography>
          <Typography sx={{ textAlign: "center", margin: 2 }}>
            {t("admin.wizard.summary.desc2")}
          </Typography>
        </>
      ) : (
        <Alert severity="error" sx={{ width: "95%", margin: 3 }}>
          <AlertTitle>{t("admin.wizard.summary.errorTitle")}</AlertTitle>
          {t("admin.wizard.summary.errorDesc")}
        </Alert>
      )}

      <Button
        size="large"
        disabled={!isValid}
        onClick={() => {
          addStoreConfig.mutate(removeIdsFromStoreConfig(storeConfig), {
            onSuccess: () => {
              navigate("/admin");
            },
          });
        }}
      >
        {t("admin.wizard.save")}
      </Button>
    </StepContentWrapper>
  );
}

export default Summary;
