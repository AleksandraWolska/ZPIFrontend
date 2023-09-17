import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";
import { calculateProgress } from "./utils";

function SpecificReservation({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: SchemaStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { setCoreConfigAttribute, withdrawToCoreConfig } = useSchema();

  return (
    <>
      <div>Specific reservation - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = SCHEMA_STEPS.SIMULTANEOUS;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.SPECIFIC_RESERVATION, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("specificReservation", true);
          const nextStep = SCHEMA_STEPS.CORE_SUMMARY;
          setActiveStep(nextStep);
          setProgress(100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("specificReservation", false);
          const nextStep = SCHEMA_STEPS.PERIODICITY;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.SPECIFIC_RESERVATION, nextStep),
          );
        }}
      >
        No
      </button>
    </>
  );
}

export default SpecificReservation;
