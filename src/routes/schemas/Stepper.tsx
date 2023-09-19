import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { USER_APP_CONFIG_STEPS, UserAppConfigStep } from "./types";
import Flexibility from "./steps/Flexibility";
import Granularity from "./steps/Granularity";
import Simultaneous from "./steps/Simultaneous";
import Uniqueness from "./steps/Uniqueness";
import GapBetween from "./steps/GapBetween";
import SpecificReservation from "./steps/SpecificReservation";
import Periodicity from "./steps/Periodicity";
import CoreSummary from "./steps/CoreSummary";
import Attributes from "./steps/Attributes";
import PrintUserAppConfig from "./steps/PrintUserAppConfig";
import RatingAndComments from "./steps/RatingAndComments";
import LayoutConfig from "./steps/LayoutConfig";

function Stepper() {
  const [activeStep, setActiveStep] = useState<UserAppConfigStep>(
    USER_APP_CONFIG_STEPS.LAYOUT_CONFIG,
  );
  const [progress, setProgress] = useState(0);

  const renderStepContent = () => {
    switch (activeStep) {
      case USER_APP_CONFIG_STEPS.LAYOUT_CONFIG:
        return <LayoutConfig setActiveStep={setActiveStep} />;
      case USER_APP_CONFIG_STEPS.FLEXIBILITY:
        return (
          <Flexibility
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case USER_APP_CONFIG_STEPS.GRANULARITY:
        return (
          <Granularity
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case USER_APP_CONFIG_STEPS.SIMULTANEOUS:
        return (
          <Simultaneous
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case USER_APP_CONFIG_STEPS.UNIQUENESS:
        return (
          <Uniqueness setActiveStep={setActiveStep} setProgress={setProgress} />
        );
      case USER_APP_CONFIG_STEPS.GAP_BETWEEN:
        return (
          <GapBetween setActiveStep={setActiveStep} setProgress={setProgress} />
        );
      case USER_APP_CONFIG_STEPS.SPECIFIC_RESERVATION:
        return (
          <SpecificReservation
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case USER_APP_CONFIG_STEPS.PERIODICITY:
        return (
          <Periodicity
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case USER_APP_CONFIG_STEPS.CORE_SUMMARY:
        return <CoreSummary setActiveStep={setActiveStep} />;
      case USER_APP_CONFIG_STEPS.ATTRIBUTES:
        return <Attributes setActiveStep={setActiveStep} />;
      case USER_APP_CONFIG_STEPS.RATING_AND_COMMENTS:
        return <RatingAndComments setActiveStep={setActiveStep} />;
      case USER_APP_CONFIG_STEPS.PRINT_SCHEMA:
        return <PrintUserAppConfig />;
      default:
        return <div>Something went wrong...</div>;
    }
  };

  return (
    <>
      <LinearProgress variant="determinate" value={progress} />
      {renderStepContent()}
    </>
  );
}

export default Stepper;
