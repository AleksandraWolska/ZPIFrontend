import { useStoreConfig } from "../StoreConfigProvider";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { calculateProgress } from "./utils";

function SpecificReservation({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { setCoreConfigAttribute, withdrawToCoreConfig } = useStoreConfig();

  return (
    <>
      <div>Specific reservation - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(
              STORE_CONFIG_STEPS.SPECIFIC_RESERVATION,
              prevStep,
            ),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("specificReservation", true);
          const nextStep = STORE_CONFIG_STEPS.CORE_SUMMARY;
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
          const nextStep = STORE_CONFIG_STEPS.PERIODICITY;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(
              STORE_CONFIG_STEPS.SPECIFIC_RESERVATION,
              nextStep,
            ),
          );
        }}
      >
        No
      </button>
    </>
  );
}

export default SpecificReservation;
