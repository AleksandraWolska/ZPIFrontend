import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";

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
          setActiveStep(SCHEMA_STEPS.USERS_PER_OFFER);
          setProgress(53.5);
        }}
      >
        Fixed
      </button>

      <button
        type="button"
        onClick={() => {
          setTimeFrame("flexible");
          setActiveStep(SCHEMA_STEPS.GRANULARITY);
          setProgress(45);
        }}
      >
        Flexible
      </button>
    </>
  );
}

export default TimeFrame;
