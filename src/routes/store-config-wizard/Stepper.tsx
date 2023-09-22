import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "./types";
import Flexibility from "./steps/Flexibility";
import Granularity from "./steps/Granularity";
import Simultaneous from "./steps/Simultaneous";
import Uniqueness from "./steps/Uniqueness";
import SpecificReservation from "./steps/SpecificReservation";
import Periodicity from "./steps/Periodicity";
import CoreSummary from "./steps/CoreSummary";
import Attributes from "./steps/Attributes";
import PrintStoreConfig from "./steps/PrintStoreConfig";
import RatingAndComments from "./steps/RatingAndComments";
import Owner from "./steps/Owner";

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
      case STORE_CONFIG_STEPS.GRANULARITY:
        return (
          <Granularity
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
      case STORE_CONFIG_STEPS.CORE_SUMMARY:
        return <CoreSummary setActiveStep={setActiveStep} />;
      case STORE_CONFIG_STEPS.ATTRIBUTES:
        return <Attributes setActiveStep={setActiveStep} />;
      case STORE_CONFIG_STEPS.RATING_AND_COMMENTS:
        return <RatingAndComments setActiveStep={setActiveStep} />;
      case STORE_CONFIG_STEPS.PRINT_SCHEMA:
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
