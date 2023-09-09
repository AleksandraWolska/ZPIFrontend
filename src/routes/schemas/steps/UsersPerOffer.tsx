import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";

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
          setProgress(prevStep === SCHEMA_STEPS.GRANULARITY ? 45 : 0);
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setUsersPerOffer("one");
          setActiveStep(SCHEMA_STEPS.GAP_BETWEEN);
          setProgress(70);
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
          setProgress(nextStep === SCHEMA_STEPS.SPECIFIC_SEATS ? 87.5 : 100);
        }}
      >
        Many
      </button>
    </>
  );
}

export default UsersPerOffer;
