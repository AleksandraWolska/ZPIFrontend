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
  const { schema, setGranularity, withdraw } = useSchema();

  return (
    <>
      <div>Granularity - Granular or Continuous?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = SCHEMA_STEPS.TIME_FRAME;
          withdraw(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.GRANULARITY, prevStep, schema),
          );
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
          setProgress(
            calculateProgress(SCHEMA_STEPS.GRANULARITY, nextStep, schema),
          );
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
          setProgress(
            calculateProgress(SCHEMA_STEPS.GRANULARITY, nextStep, schema),
          );
        }}
      >
        Continuous
      </button>
    </>
  );
}

export default Granularity;
