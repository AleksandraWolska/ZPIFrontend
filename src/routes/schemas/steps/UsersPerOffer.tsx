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
  const { schema, setUsersPerOffer, withdrawMechanics } = useSchema();

  return (
    <>
      <div>Users per offer - One or Many?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = schema.mechanics.granularity
            ? SCHEMA_STEPS.GRANULARITY
            : SCHEMA_STEPS.TIME_FRAME;
          withdrawMechanics(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.USERS_PER_OFFER, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setUsersPerOffer("one");
          const nextStep =
            schema.mechanics.timeFrame === "fixed"
              ? SCHEMA_STEPS.PERIODICITY
              : SCHEMA_STEPS.GAP_BETWEEN;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.USERS_PER_OFFER, nextStep),
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
            schema.mechanics.timeFrame === "fixed"
              ? SCHEMA_STEPS.SPECIFIC_SEATS
              : SCHEMA_STEPS.ENTITY_UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.USERS_PER_OFFER, nextStep),
          );
        }}
      >
        Many
      </button>
    </>
  );
}

export default UsersPerOffer;
