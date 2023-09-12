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
  const { setGranularity, withdrawMechanics } = useSchema();

  return (
    <>
      <div>Granularity - Granular or Continuous?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = SCHEMA_STEPS.TIME_FRAME;
          withdrawMechanics(prevStep);
          setActiveStep(prevStep);
          setProgress(calculateProgress(SCHEMA_STEPS.GRANULARITY, prevStep));
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setGranularity("granular");
          const nextStep = SCHEMA_STEPS.USERS_PER_OFFER;
          setActiveStep(nextStep);
          setProgress(calculateProgress(SCHEMA_STEPS.GRANULARITY, nextStep));
        }}
      >
        Granular
      </button>

      <button
        type="button"
        onClick={() => {
          setGranularity("continuous");
          const nextStep = SCHEMA_STEPS.USERS_PER_OFFER;
          setActiveStep(nextStep);
          setProgress(calculateProgress(SCHEMA_STEPS.GRANULARITY, nextStep));
        }}
      >
        Continuous
      </button>
    </>
  );
}

export default Granularity;
