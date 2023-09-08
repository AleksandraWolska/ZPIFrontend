import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";

function UsersPerOffer({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
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
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setUsersPerOffer("one");
          setActiveStep(SCHEMA_STEPS.GAP_BETWEEN);
        }}
      >
        One
      </button>

      <button
        type="button"
        onClick={() => {
          setUsersPerOffer("many");
          setActiveStep(
            schema.timeFrame === "fixed"
              ? SCHEMA_STEPS.SPECIFIC_SEATS
              : SCHEMA_STEPS.ENTITY_UNIQUENESS,
          );
        }}
      >
        Many
      </button>
    </>
  );
}

export default UsersPerOffer;
