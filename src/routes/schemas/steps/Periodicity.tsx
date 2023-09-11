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
  const { schema, setPeriodicity, withdraw } = useSchema();

  return (
    <>
      <div>Periodicity - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            schema.usersPerOffer === "one"
              ? SCHEMA_STEPS.USERS_PER_OFFER
              : SCHEMA_STEPS.SPECIFIC_SEATS;
          withdraw(prevStep);
          setActiveStep(prevStep);
          setProgress(calculateProgress(SCHEMA_STEPS.PERIODICITY, prevStep));
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setPeriodicity(true);
          setActiveStep(SCHEMA_STEPS.DUMMY);
          setProgress(100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setPeriodicity(false);
          setActiveStep(SCHEMA_STEPS.DUMMY);
          setProgress(100);
        }}
      >
        No
      </button>
    </>
  );
}

export default Periodicity;
