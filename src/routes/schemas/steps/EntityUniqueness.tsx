import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";
import { calculateProgress } from "./utils";

function EntityUniqueness({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: SchemaStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { schema, setEntityUniqueness, withdrawMechanics } = useSchema();

  return (
    <>
      <div>Entity uniqueness - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            schema.mechanics.usersPerOffer === "one"
              ? SCHEMA_STEPS.GAP_BETWEEN
              : SCHEMA_STEPS.USERS_PER_OFFER;
          withdrawMechanics(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.ENTITY_UNIQUENESS, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setEntityUniqueness(true);
          setActiveStep(SCHEMA_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setEntityUniqueness(false);
          setActiveStep(SCHEMA_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        No
      </button>
    </>
  );
}

export default EntityUniqueness;
