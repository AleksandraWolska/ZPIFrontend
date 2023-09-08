import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";

function GapBetween({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
}) {
  const { schema, setGapBetween, withdraw } = useSchema();

  return (
    <>
      <div>Gap between - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          withdraw(SCHEMA_STEPS.USERS_PER_OFFER);
          setActiveStep(SCHEMA_STEPS.USERS_PER_OFFER);
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setGapBetween(true);
          setActiveStep(
            schema.timeFrame === "fixed"
              ? SCHEMA_STEPS.SPECIFIC_SEATS
              : SCHEMA_STEPS.ENTITY_UNIQUENESS,
          );
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setGapBetween(false);
          setActiveStep(
            schema.timeFrame === "fixed"
              ? SCHEMA_STEPS.SPECIFIC_SEATS
              : SCHEMA_STEPS.ENTITY_UNIQUENESS,
          );
        }}
      >
        No
      </button>
    </>
  );
}

export default GapBetween;
