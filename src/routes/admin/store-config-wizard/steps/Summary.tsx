import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { useStoreConfig } from "../StoreConfigProvider";
import StepContentWrapper from "./components/StepContentWrapper";
import useAddStoreConfig, {
  removeIdsFromStoreConfig,
} from "../../new-store/useAddStoreConfig";
import useEditStoreConfig from "../../store-settings/useEditStoreConfig";
import WizardStepTitle from "./components/WizardStepTitle";
import BackButton from "./components/BackButton";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";

function Summary({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { t } = useTranslation();

  const { storeConfig } = useStoreConfig();
  const addStoreConfig = useAddStoreConfig();
  const editStoreConfig = useEditStoreConfig();
  const navigate = useNavigate();
  const location = useLocation();

  const isValid = storeConfig.owner.name !== "";

  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => setActiveStep(STORE_CONFIG_STEPS.DETAILS_PAGE)}
      />

      <WizardStepTitle>Summary</WizardStepTitle>

      {isValid ? (
        <>
          <Box sx={{ margin: 1 }}>
            {/* <CheckCircleOutlineIcon sx={{ fontSize: "5rem", color: "grey" }} /> */}
            <DownloadDoneIcon sx={{ fontSize: "5rem", color: "grey" }} />
          </Box>
          <Typography sx={{ textAlign: "center", margin: 1 }}>
            {`We've gathered all the essential details.`}
          </Typography>
          <Typography sx={{ textAlign: "center", margin: 2 }}>
            {`If you're ready to proceed, simply save your store settings and start
        enjoying your personalized applications!`}
          </Typography>
        </>
      ) : (
        <Alert severity="error" sx={{ width: "95%", margin: 3 }}>
          <AlertTitle>Some required data is missing</AlertTitle>
          Fill all the necessary fields to proceed
        </Alert>
      )}
      <Box textOverflow="wrap" sx={{ wordBreak: "break-all" }}>
        {JSON.stringify(storeConfig)}
      </Box>
      <Button
        size="large"
        disabled={!isValid}
        onClick={() => {
          if (location.pathname.includes("new")) {
            addStoreConfig.mutate(removeIdsFromStoreConfig(storeConfig), {
              onSuccess: () => {
                navigate("/admin");
              },
            });
          } else {
            editStoreConfig.mutate(storeConfig, {
              onSuccess: () => {
                navigate("/admin");
              },
            });
          }
        }}
      >
        {t("admin.wizard.save")}
      </Button>
    </StepContentWrapper>
  );
}

export default Summary;
