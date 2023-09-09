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
  const { schema, setSpecificSeats, withdraw } = useSchema();

  return (
    <>
      <div>Specific seats - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            schema.usersPerOffer === "one"
              ? SCHEMA_STEPS.GAP_BETWEEN
              : SCHEMA_STEPS.USERS_PER_OFFER;
          withdraw(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.SPECIFIC_SEATS, prevStep, schema),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setSpecificSeats(true);
          const nextStep =
            schema.usersPerOffer === "one"
              ? SCHEMA_STEPS.PERIODICITY
              : SCHEMA_STEPS.DUMMY;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(SCHEMA_STEPS.SPECIFIC_SEATS, nextStep, schema),
          );
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
          setProgress(
            calculateProgress(SCHEMA_STEPS.SPECIFIC_SEATS, nextStep, schema),
          );
        }}
      >
        No
      </button>
    </>
  );
}

export default SpecificSeats;
