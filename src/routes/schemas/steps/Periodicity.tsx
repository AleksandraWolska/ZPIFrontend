import { SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";
import { calculateProgress } from "./utils";

function Periodicity({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: SchemaStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { schema, setCoreConfigAttribute, withdrawToCoreConfig } = useSchema();

  return (
    <>
      <div>Periodicity - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            schema.coreConfig.simultaneous === false
              ? SCHEMA_STEPS.SIMULTANEOUS
              : SCHEMA_STEPS.SPECIFIC_RESERVATION;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(calculateProgress(SCHEMA_STEPS.PERIODICITY, prevStep));
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("periodicity", true);
          setActiveStep(SCHEMA_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("periodicity", false);
          setActiveStep(SCHEMA_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        No
      </button>
    </>
  );
}

export default Periodicity;
