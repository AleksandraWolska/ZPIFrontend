import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";
import { calculateProgress } from "./utils";

function SpecificSeats({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: SchemaStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { setSpecificSeats, withdraw } = useSchema();

  return (
    <>
      <div>Specific seats - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = SCHEMA_STEPS.USERS_PER_OFFER;
          withdraw(prevStep);
          setActiveStep(prevStep);
          setProgress(calculateProgress(SCHEMA_STEPS.SPECIFIC_SEATS, prevStep));
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setSpecificSeats(true);
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
          setSpecificSeats(false);
          const nextStep = SCHEMA_STEPS.PERIODICITY;
          setActiveStep(nextStep);
          setProgress(calculateProgress(SCHEMA_STEPS.SPECIFIC_SEATS, nextStep));
        }}
      >
        No
      </button>
    </>
  );
}

export default SpecificSeats;
