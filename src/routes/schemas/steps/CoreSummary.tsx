import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";

function CoreSummary({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
}) {
  const { schema, withdrawToCoreConfig } = useSchema();

  return (
    <>
      <h4>You specified core config of your schema!</h4>

      <p>Proceed to set custom parameters of the entity of your offer.</p>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            schema.coreConfig.periodicity !== undefined
              ? SCHEMA_STEPS.PERIODICITY
              : schema.coreConfig.specificReservation !== undefined
              ? SCHEMA_STEPS.SPECIFIC_RESERVATION
              : SCHEMA_STEPS.UNIQUENESS;
          withdrawToCoreConfig(prevStep);
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
