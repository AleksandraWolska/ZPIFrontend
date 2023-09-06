import { SCHEMA_STEPS, SchemaStep } from "./types";

function TimeFrame({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
}) {
  return (
    <>
      <div>TimeFrame</div>
      <button
        type="button"
        onClick={() => setActiveStep(SCHEMA_STEPS.GRANULARITY)}
      >
        Next
      </button>
    </>
  );
}

export default TimeFrame;
