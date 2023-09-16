import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { SCHEMA_STEPS, SchemaStep } from "./types";
import Flexibility from "./steps/Flexibility";
import Granularity from "./steps/Granularity";
import Simultaneous from "./steps/Simultaneous";
import Uniqueness from "./steps/Uniqueness";
import GapBetween from "./steps/GapBetween";
import SpecificReservation from "./steps/SpecificReservation";
import Periodicity from "./steps/Periodicity";
import CoreSummary from "./steps/CoreSummary";
import CustomParams from "./steps/CustomParams";
import PrintSchema from "./steps/PrintSchema";
import RatingAndComments from "./steps/RatingAndComments";
import LayoutConfig from "./steps/LayoutConfig";

function Stepper() {
  const [activeStep, setActiveStep] = useState<SchemaStep>(
    SCHEMA_STEPS.LAYOUT_CONFIG,
  );
  const [progress, setProgress] = useState(0);

  const renderStepContent = () => {
    switch (activeStep) {
      case SCHEMA_STEPS.LAYOUT_CONFIG:
        return <LayoutConfig setActiveStep={setActiveStep} />;
      case SCHEMA_STEPS.FLEXIBILITY:
        return (
          <Flexibility
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case SCHEMA_STEPS.GRANULARITY:
        return (
          <Granularity
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case SCHEMA_STEPS.SIMULTANEOUS:
        return (
          <Simultaneous
            setActiveStep={setActiveStep}
            setProgress={setProgress}
          />
        );
      case SCHEMA_STEPS.UNIQUENESS:
        return (
          <Uniqueness setActiveStep={setActiveStep} setProgress={setProgress} />
        );
      case SCHEMA_STEPS.GAP_BETWEEN:
        return (
          <GapBetween setActiveStep={setActiveStep} setProgress={setProgress} />
        );
      case SCHEMA_STEPS.SPECIFIC_RESERVATION:
        return (
          <SpecificReservation
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
      case SCHEMA_STEPS.RATING_AND_COMMENTS:
        return <RatingAndComments setActiveStep={setActiveStep} />;
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
