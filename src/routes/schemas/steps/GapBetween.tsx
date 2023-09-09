import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";
import { calculateProgress } from "./utils";

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
          const prevStep = SCHEMA_STEPS.USERS_PER_OFFER;
          withdraw(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.GAP_BETWEEN, prevStep, schema),
          );
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
          setProgress(
            calculateProgress(SCHEMA_STEPS.GAP_BETWEEN, nextStep, schema),
          );
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
          setProgress(
            calculateProgress(SCHEMA_STEPS.GAP_BETWEEN, nextStep, schema),
          );
        }}
      >
        No
      </button>
    </>
  );
}

export default GapBetween;
