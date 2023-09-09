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
  const { schema, setEntityUniqueness, withdraw } = useSchema();

  return (
    <>
      <div>Entity uniqueness - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            schema.usersPerOffer === "one"
              ? SCHEMA_STEPS.GAP_BETWEEN
              : SCHEMA_STEPS.USERS_PER_OFFER;
          withdraw(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.ENTITY_UNIQUENESS, prevStep, schema),
          );
        }}
      >
        BACK
      </button>

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
