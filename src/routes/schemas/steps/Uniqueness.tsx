import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";
import { calculateProgress } from "./utils";

function Uniqueness({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: SchemaStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { schema, setUniqueness, withdrawToCoreConfig } = useSchema();

  return (
    <>
      <div>Uniqueness - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            schema.coreConfig.simultaneous === false
              ? SCHEMA_STEPS.GAP_BETWEEN
              : SCHEMA_STEPS.SIMULTANEOUS;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(calculateProgress(SCHEMA_STEPS.UNIQUENESS, prevStep));
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setUniqueness(true);
          setActiveStep(SCHEMA_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setUniqueness(false);
          setActiveStep(SCHEMA_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        No
      </button>
    </>
  );
}

export default Uniqueness;
