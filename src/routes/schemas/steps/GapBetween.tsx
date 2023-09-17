import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";
import { calculateProgress } from "./utils";

function GapBetween({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: SchemaStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { setCoreConfigAttribute, withdrawToCoreConfig } = useSchema();

  return (
    <>
      <div>Gap between - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = SCHEMA_STEPS.SIMULTANEOUS;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(calculateProgress(SCHEMA_STEPS.GAP_BETWEEN, prevStep));
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("gapBetween", true);
          const nextStep = SCHEMA_STEPS.UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(calculateProgress(SCHEMA_STEPS.GAP_BETWEEN, nextStep));
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("gapBetween", false);
          const nextStep = SCHEMA_STEPS.UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(calculateProgress(SCHEMA_STEPS.GAP_BETWEEN, nextStep));
        }}
      >
        No
      </button>
    </>
  );
}

export default GapBetween;
