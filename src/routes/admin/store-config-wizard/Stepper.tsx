import { useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "./types";
import Flexibility from "./steps/core/Flexibility";
import Granularity from "./steps/core/Granularity";
import Simultaneous from "./steps/core/Simultaneous";
import Uniqueness from "./steps/core/Uniqueness";
import SpecificReservation from "./steps/core/SpecificReservation";
import Periodicity from "./steps/core/Periodicity";
import CustomAttributesSpec from "./steps/CustomAttributesSpec";
import Summary from "./steps/Summary";
import MainPage from "./steps/MainPage";
import GeneralStoreInfo from "./steps/general-store-info/GeneralStoreInfo";
import DetailsPage from "./steps/DetailsPage";
import AllowOverNight from "./steps/core/AllowOverNight";
import AuthConfig from "./steps/AuthConfig";

function Stepper() {
  const [activeStep, setActiveStep] = useState<StoreConfigStep>(
    STORE_CONFIG_STEPS.GENERAL_STORE_INFO,
  );
  const [progress, setProgress] = useState(0);

  const renderStepContent = () => {
    switch (activeStep) {
      case STORE_CONFIG_STEPS.GENERAL_STORE_INFO:
        return <GeneralStoreInfo setActiveStep={setActiveStep} />;
      case STORE_CONFIG_STEPS.FLEXIBILITY:
        return (
          <Flexibility
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case STORE_CONFIG_STEPS.GRANULARITY:
        return (
          <Granularity
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT:
        return (
          <AllowOverNight
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case STORE_CONFIG_STEPS.SIMULTANEOUS:
        return (
          <Simultaneous
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case STORE_CONFIG_STEPS.UNIQUENESS:
        return (
          <Uniqueness setActiveStep={setActiveStep} setProgress={setProgress} />
        );
      case STORE_CONFIG_STEPS.SPECIFIC_RESERVATION:
        return (
          <SpecificReservation
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case STORE_CONFIG_STEPS.PERIODICITY:
        return (
          <Periodicity
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC:
        return <CustomAttributesSpec setActiveStep={setActiveStep} />;
      case STORE_CONFIG_STEPS.MAIN_PAGE:
        return <MainPage setActiveStep={setActiveStep} />;
      case STORE_CONFIG_STEPS.DETAILS_PAGE:
        return <DetailsPage setActiveStep={setActiveStep} />;
      case STORE_CONFIG_STEPS.AUTH_CONFIG:
        return <AuthConfig setActiveStep={setActiveStep} />;
      case STORE_CONFIG_STEPS.SUMMARY:
        return <Summary />;
      default:
        return <div>Something went wrong...</div>;
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "1000px",
        width: "90vw",
        boxShadow: "1px 1px 5px 2px rgba(0, 0, 0, .2)",
        borderRadius: "15px",
        padding: 1.25,
        margin: "auto",
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ margin: 2, height: "8px", borderRadius: "4px" }}
      />
      {renderStepContent()}
    </Box>
  );
}

export default Stepper;
