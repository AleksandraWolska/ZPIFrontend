import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";

function GapBetween({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: SchemaStep) => void;
  setProgress: (progress: number) => void;
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
          setProgress(schema.timeFrame === "fixed" ? 53.5 : 67.5);
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setGapBetween(true);
          const nextStep =
            schema.timeFrame === "fixed"
              ? SCHEMA_STEPS.SPECIFIC_SEATS
              : SCHEMA_STEPS.ENTITY_UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(nextStep === SCHEMA_STEPS.SPECIFIC_SEATS ? 80 : 100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setGapBetween(false);
          const nextStep =
            schema.timeFrame === "fixed"
              ? SCHEMA_STEPS.SPECIFIC_SEATS
              : SCHEMA_STEPS.ENTITY_UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(nextStep === SCHEMA_STEPS.SPECIFIC_SEATS ? 80 : 100);
        }}
      >
        No
      </button>
    </>
  );
}

export default GapBetween;
