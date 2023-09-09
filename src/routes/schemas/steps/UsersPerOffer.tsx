import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";
import { calculateProgress } from "./utils";

function UsersPerOffer({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: SchemaStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { schema, setUsersPerOffer, withdraw } = useSchema();

  return (
    <>
      <div>Users per offer - One or Many?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = schema.granularity
            ? SCHEMA_STEPS.GRANULARITY
            : SCHEMA_STEPS.TIME_FRAME;
          withdraw(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.USERS_PER_OFFER, prevStep, schema),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setUsersPerOffer("one");
          const nextStep = SCHEMA_STEPS.GAP_BETWEEN;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.USERS_PER_OFFER, nextStep, schema),
          );
        }}
      >
        One
      </button>

      <button
        type="button"
        onClick={() => {
          setUsersPerOffer("many");
          const nextStep =
            schema.timeFrame === "fixed"
              ? SCHEMA_STEPS.SPECIFIC_SEATS
              : SCHEMA_STEPS.ENTITY_UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.USERS_PER_OFFER, nextStep, schema),
          );
        }}
      >
        Many
      </button>
    </>
  );
}

export default UsersPerOffer;
