import { useState } from "react";
import { SCHEMA_STEPS, SchemaStep } from "./types";
import TimeFrame from "./steps/TimeFrame";
import Granularity from "./steps/Granularity";
import UsersPerOffer from "./steps/UsersPerOffer";

function Stepper() {
  const [activeStep, setActiveStep] = useState<SchemaStep>(
    SCHEMA_STEPS.TIME_FRAME,
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case SCHEMA_STEPS.TIME_FRAME:
        return <TimeFrame setActiveStep={setActiveStep} />;
      case SCHEMA_STEPS.GRANULARITY:
        return <Granularity setActiveStep={setActiveStep} />;
      case SCHEMA_STEPS.USERS_PER_OFFER:
        return <UsersPerOffer />;
      default:
        return <div>Something went wrong...</div>;
    }
  };

  return renderStepContent();
}

export default Stepper;
