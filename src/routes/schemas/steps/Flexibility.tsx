import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";
import { calculateProgress } from "./utils";

function Flexibility({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: SchemaStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { setFlexibility } = useSchema();

  return (
    <>
      <div>Flexibility - True or False?</div>

      <button
        type="button"
        onClick={() => {
          setFlexibility(true);
          const nextStep = SCHEMA_STEPS.GRANULARITY;
          setActiveStep(nextStep);
          setProgress(calculateProgress(SCHEMA_STEPS.FLEXIBILITY, nextStep));
        }}
      >
        True
      </button>

      <button
        type="button"
        onClick={() => {
          setFlexibility(false);
          const nextStep = SCHEMA_STEPS.SIMULTANEOUS;
          setActiveStep(nextStep);
          setProgress(calculateProgress(SCHEMA_STEPS.FLEXIBILITY, nextStep));
        }}
      >
        False
      </button>
    </>
  );
}

export default Flexibility;
