import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";

function CoreSummary({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
}) {
  const { schema, withdrawMechanics } = useSchema();

  return (
    <>
      <h4>You specified core mechanics of your schema!</h4>

      <p>Proceed to set custom parameters of the entity of your offer.</p>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            schema.mechanics.periodicity !== undefined
              ? SCHEMA_STEPS.PERIODICITY
              : schema.mechanics.specificSeats !== undefined
              ? SCHEMA_STEPS.SPECIFIC_SEATS
              : SCHEMA_STEPS.ENTITY_UNIQUENESS;
          withdrawMechanics(prevStep);
          setActiveStep(prevStep);
        }}
      >
        Back
      </button>

      <button
        type="button"
        onClick={() => {
          setActiveStep(SCHEMA_STEPS.CUSTOM_PARAMS);
        }}
      >
        Next
      </button>
    </>
  );
}

export default CoreSummary;
