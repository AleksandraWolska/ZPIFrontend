import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";

function Granularity({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: SchemaStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { setGranularity, withdraw } = useSchema();

  return (
    <>
      <div>Granularity - Granular or Continuous?</div>

      <button
        type="button"
        onClick={() => {
          withdraw(SCHEMA_STEPS.TIME_FRAME);
          setActiveStep(SCHEMA_STEPS.TIME_FRAME);
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setGranularity("granular");
          setActiveStep(SCHEMA_STEPS.USERS_PER_OFFER);
          setProgress(67);
        }}
      >
        Granular
      </button>

      <button
        type="button"
        onClick={() => {
          setGranularity("continuous");
          setActiveStep(SCHEMA_STEPS.USERS_PER_OFFER);
          setProgress(67);
        }}
      >
        Continuous
      </button>
    </>
  );
}

export default Granularity;
