import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";

function UsersPerOffer({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
}) {
  const { schema, setUsersPerOffer } = useSchema();

  return (
    <>
      <div>Users per offer - One or Many?</div>

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