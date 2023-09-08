import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";

function SpecificSeats({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
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
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setSpecificSeats(false);
          setActiveStep(
            schema.usersPerOffer === "one"
              ? SCHEMA_STEPS.PERIODICITY
              : SCHEMA_STEPS.DUMMY,
          );
        }}
      >
        No
      </button>
    </>
  );
}

export default SpecificSeats;
