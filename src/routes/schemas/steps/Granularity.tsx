import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";
import { calculateProgress } from "./utils";

function Granularity({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: SchemaStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { setGranularity, withdrawToCoreConfig } = useSchema();

  return (
    <>
      <div>Granularity - True or False?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = SCHEMA_STEPS.FLEXIBILITY;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(calculateProgress(SCHEMA_STEPS.GRANULARITY, prevStep));
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setGranularity(true);
          const nextStep = SCHEMA_STEPS.SIMULTANEOUS;
          setActiveStep(nextStep);
          setProgress(calculateProgress(SCHEMA_STEPS.GRANULARITY, nextStep));
        }}
      >
        True
      </button>

      <button
        type="button"
        onClick={() => {
          setGranularity(false);
          const nextStep = SCHEMA_STEPS.SIMULTANEOUS;
          setActiveStep(nextStep);
          setProgress(calculateProgress(SCHEMA_STEPS.GRANULARITY, nextStep));
        }}
      >
        False
      </button>
    </>
  );
}

export default Granularity;
