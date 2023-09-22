import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { useStoreConfig } from "../StoreConfigProvider";
import { calculateProgress } from "./utils";

function Periodicity({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { storeConfig, setCoreConfigAttribute, withdrawToCoreConfig } =
    useStoreConfig();

  return (
    <>
      <div>Periodicity - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            storeConfig.coreConfig.simultaneous === false
              ? STORE_CONFIG_STEPS.SIMULTANEOUS
              : STORE_CONFIG_STEPS.SPECIFIC_RESERVATION;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.PERIODICITY, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("periodicity", true);
          setActiveStep(STORE_CONFIG_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("periodicity", false);
          setActiveStep(STORE_CONFIG_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        No
      </button>
    </>
  );
}

export default Periodicity;
