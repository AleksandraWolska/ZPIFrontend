import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";

function EntityUniqueness({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
}) {
  const { setEntityUniqueness } = useSchema();

  return (
    <>
      <div>Entity uniqueness - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          setEntityUniqueness(true);
          setActiveStep(SCHEMA_STEPS.DUMMY);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setEntityUniqueness(false);
          setActiveStep(SCHEMA_STEPS.DUMMY);
        }}
      >
        No
      </button>
    </>
  );
}

export default EntityUniqueness;
