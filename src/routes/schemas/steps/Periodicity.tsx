import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";

function Periodicity({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
}) {
  const { setPeriodicity, withdraw } = useSchema();

  return (
    <>
      <div>Periodicity - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          withdraw(SCHEMA_STEPS.SPECIFIC_SEATS);
          setActiveStep(SCHEMA_STEPS.SPECIFIC_SEATS);
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setPeriodicity(true);
          setActiveStep(SCHEMA_STEPS.DUMMY);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setPeriodicity(false);
          setActiveStep(SCHEMA_STEPS.DUMMY);
        }}
      >
        No
      </button>
    </>
  );
}

export default Periodicity;
