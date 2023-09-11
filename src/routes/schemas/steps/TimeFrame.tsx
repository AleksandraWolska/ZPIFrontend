import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";
import { calculateProgress } from "./utils";

function TimeFrame({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: SchemaStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { setTimeFrame } = useSchema();

  return (
    <>
      <div>TimeFrame - Fixed or Flexible?</div>

      <button
        type="button"
        onClick={() => {
          setTimeFrame("fixed");
          const nextStep = SCHEMA_STEPS.USERS_PER_OFFER;
          setActiveStep(nextStep);
          setProgress(calculateProgress(SCHEMA_STEPS.TIME_FRAME, nextStep));
        }}
      >
        Fixed
      </button>

      <button
        type="button"
        onClick={() => {
          setTimeFrame("flexible");
          const nextStep = SCHEMA_STEPS.GRANULARITY;
          setActiveStep(nextStep);
          setProgress(calculateProgress(SCHEMA_STEPS.TIME_FRAME, nextStep));
        }}
      >
        Flexible
      </button>
    </>
  );
}

export default TimeFrame;
