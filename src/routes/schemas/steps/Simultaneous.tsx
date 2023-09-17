import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";
import { calculateProgress } from "./utils";

function Simultaneous({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: SchemaStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { schema, setCoreConfigAttribute, withdrawToCoreConfig } = useSchema();

  return (
    <>
      <div>Simultaneous - True or False?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            schema.coreConfig.granularity !== undefined
              ? SCHEMA_STEPS.GRANULARITY
              : SCHEMA_STEPS.FLEXIBILITY;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(calculateProgress(SCHEMA_STEPS.SIMULTANEOUS, prevStep));
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("simultaneous", true);
          const nextStep =
            schema.coreConfig.flexibility === false
              ? SCHEMA_STEPS.SPECIFIC_RESERVATION
              : SCHEMA_STEPS.UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(calculateProgress(SCHEMA_STEPS.SIMULTANEOUS, nextStep));
        }}
      >
        True
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("simultaneous", false);
          const nextStep =
            schema.coreConfig.flexibility === false
              ? SCHEMA_STEPS.PERIODICITY
              : SCHEMA_STEPS.GAP_BETWEEN;
          setActiveStep(nextStep);
          setProgress(calculateProgress(SCHEMA_STEPS.SIMULTANEOUS, nextStep));
        }}
      >
        False
      </button>
    </>
  );
}

export default Simultaneous;
