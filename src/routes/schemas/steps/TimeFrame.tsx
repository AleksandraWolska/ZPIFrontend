import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";

function TimeFrame({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
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
        }}
      >
        Fixed
      </button>

      <button
        type="button"
        onClick={() => {
          setTimeFrame("flexible");
          setActiveStep(SCHEMA_STEPS.GRANULARITY);
        }}
      >
        Flexible
      </button>
    </>
  );
}

export default TimeFrame;
