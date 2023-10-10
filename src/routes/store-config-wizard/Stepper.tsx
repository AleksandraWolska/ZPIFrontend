import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "./types";
import Flexibility from "./steps/core/Flexibility";
import ScheduleType from "./steps/core/ScheduleType";
import Simultaneous from "./steps/core/Simultaneous";
import Uniqueness from "./steps/core/Uniqueness";
import SpecificReservation from "./steps/core/SpecificReservation";
import Periodicity from "./steps/core/Periodicity";
import CustomAttributesSpec from "./steps/CustomAttributesSpec";
import PrintStoreConfig from "./steps/PrintStoreConfig";
import MainPage from "./steps/MainPage";
import Owner from "./steps/Owner";
import DetailsPage from "./steps/DetailsPage";

function Stepper() {
  const [activeStep, setActiveStep] = useState<StoreConfigStep>(
    STORE_CONFIG_STEPS.OWNER,
  );
  const [progress, setProgress] = useState(0);

  const renderStepContent = () => {
    switch (activeStep) {
      case STORE_CONFIG_STEPS.OWNER:
        return <Owner setActiveStep={setActiveStep} />;
      case STORE_CONFIG_STEPS.FLEXIBILITY:
        return (
          <Flexibility
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case STORE_CONFIG_STEPS.SCHEDULE_TYPE:
        return (
          <ScheduleType
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
      case STORE_CONFIG_STEPS.PRINT_STORE_CONFIG:
        return <PrintStoreConfig />;
      default:
        return <div>Something went wrong...</div>;
    }
  };

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ marginBottom: 2 }}
      />
      {renderStepContent()}
    </>
  );
}

export default Stepper;
