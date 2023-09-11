import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { SCHEMA_STEPS, SchemaStep } from "./types";
import TimeFrame from "./steps/TimeFrame";
import Granularity from "./steps/Granularity";
import UsersPerOffer from "./steps/UsersPerOffer";
import EntityUniqueness from "./steps/EntityUniqueness";
import GapBetween from "./steps/GapBetween";
import SpecificSeats from "./steps/SpecificSeats";
import Periodicity from "./steps/Periodicity";
import CoreSummary from "./steps/CoreSummary";
import CustomParams from "./steps/CustomParams";
import PrintSchema from "./steps/PrintSchema";

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
        return (
          <UsersPerOffer
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case SCHEMA_STEPS.ENTITY_UNIQUENESS:
        return (
          <EntityUniqueness
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case SCHEMA_STEPS.GAP_BETWEEN:
        return (
          <GapBetween setActiveStep={setActiveStep} setProgress={setProgress} />
        );
      case SCHEMA_STEPS.SPECIFIC_SEATS:
        return (
          <SpecificSeats
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case SCHEMA_STEPS.PERIODICITY:
        return (
          <Periodicity
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case SCHEMA_STEPS.CORE_SUMMARY:
        return <CoreSummary setActiveStep={setActiveStep} />;
      case SCHEMA_STEPS.CUSTOM_PARAMS:
        return <CustomParams setActiveStep={setActiveStep} />;
      case SCHEMA_STEPS.PRINT_SCHEMA:
        return <PrintSchema />;
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
