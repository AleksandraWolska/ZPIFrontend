import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";

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
          setProgress(prevStep === SCHEMA_STEPS.GAP_BETWEEN ? 70 : 53.5);
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setSpecificSeats(true);
          setActiveStep(
            schema.usersPerOffer === "one"
              ? SCHEMA_STEPS.PERIODICITY
              : SCHEMA_STEPS.DUMMY,
          );
          setProgress(100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setSpecificSeats(false);
          setActiveStep(SCHEMA_STEPS.PERIODICITY);
          setProgress(100);
        }}
      >
        No
      </button>
    </>
  );
}

export default SpecificSeats;
