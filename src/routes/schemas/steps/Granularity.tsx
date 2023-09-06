import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";

function Granularity({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
}) {
  const { setGranularity } = useSchema();

  return (
    <>
      <div>Granularity - Granular or Continuous?</div>

      <button
        type="button"
        onClick={() => {
          setGranularity("granular");
          setActiveStep(SCHEMA_STEPS.USERS_PER_OFFER);
        }}
      >
        Granular
      </button>

      <button
        type="button"
        onClick={() => {
          setGranularity("continuous");
          setActiveStep(SCHEMA_STEPS.USERS_PER_OFFER);
        }}
      >
        Continuous
      </button>
    </>
  );
}

export default Granularity;
