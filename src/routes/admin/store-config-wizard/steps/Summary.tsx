import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useStoreConfig } from "../StoreConfigProvider";
import StepContentWrapper from "./components/StepContentWrapper";
import useAddStoreConfig, {
  removeIdsFromStoreConfig,
} from "../../new-store/useAddStoreConfig";
import useEditStoreConfig from "../../store-settings/useEditStoreConfig";
import WizardStepTitle from "./components/WizardStepTitle";
import BackButton from "./components/BackButton";

function Summary() {
  const { storeConfig } = useStoreConfig();
  const addStoreConfig = useAddStoreConfig();
  const editStoreConfig = useEditStoreConfig();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => console.log()}
        //  TODO back to authentication onClick={() => setActiveStep(STORE_CONFIG_STEPS.DETAILS_PAGE)}
      />

      <WizardStepTitle>All done!</WizardStepTitle>
      <Box sx={{ margin: 1 }}>
        {/* <CheckCircleOutlineIcon sx={{ fontSize: "5rem", color: "grey" }} /> */}
        <DownloadDoneIcon sx={{ fontSize: "5rem", color: "grey" }} />
      </Box>

      <Typography sx={{ textAlign: "center", margin: 1 }}>
        {`We've gathered all the essential details.`}
      </Typography>
      <Typography sx={{ textAlign: "center", margin: 2 }}>
        {`If you're ready to proceed, simply save your store settings and start
        enjoying your personalized shopping experience!`}
      </Typography>
      <Box textOverflow="wrap" sx={{ wordBreak: "break-all" }}>
        {JSON.stringify(storeConfig)}
      </Box>
      <Button
        size="large"
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
        Save your store
      </Button>
    </StepContentWrapper>
  );
}

export default Summary;
