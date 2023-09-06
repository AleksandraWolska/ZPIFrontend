import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { SCHEMA_STEPS, SchemaStep } from "./types";
import TimeFrame from "./steps/TimeFrame";
import Granularity from "./steps/Granularity";
import UsersPerOffer from "./steps/UsersPerOffer";

function Stepper() {
  const [activeStep, setActiveStep] = useState<SchemaStep>(
    SCHEMA_STEPS.TIME_FRAME,
  );
  const [progress, setProgress] = useState(0);

  const renderStepContent = () => {
    switch (activeStep) {
      case SCHEMA_STEPS.TIME_FRAME:
        return (
          <TimeFrame setActiveStep={setActiveStep} setProgress={setProgress} />
        );
      case SCHEMA_STEPS.GRANULARITY:
        return (
          <Granularity
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case SCHEMA_STEPS.USERS_PER_OFFER:
        return <UsersPerOffer />;
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
