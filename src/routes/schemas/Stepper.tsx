import { useState } from "react";
import TimeFrame from "./TimeFrame";
import { SCHEMA_STEPS, SchemaStep } from "./types";
import Granularity from "./Granularity";

function Stepper() {
  const [activeStep, setActiveStep] = useState<SchemaStep>(
    SCHEMA_STEPS.TIME_FRAME,
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case SCHEMA_STEPS.TIME_FRAME:
        return <TimeFrame setActiveStep={setActiveStep} />;
      case SCHEMA_STEPS.GRANULARITY:
        return <Granularity />;
      default:
        return <div>Something went wrong...</div>;
    }
  };

  return (
    <>
      <div>Stepper</div>
      {renderStepContent()}
    </>
  );
}

export default Stepper;
