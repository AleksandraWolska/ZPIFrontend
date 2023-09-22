import { useStoreConfig } from "../StoreConfigProvider";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { calculateProgress } from "./utils";

function Uniqueness({
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
      <div>Uniqueness - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            storeConfig.coreConfig.simultaneous === false
              ? STORE_CONFIG_STEPS.GAP_BETWEEN
              : STORE_CONFIG_STEPS.SIMULTANEOUS;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.UNIQUENESS, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("uniqueness", true);
          setActiveStep(STORE_CONFIG_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("uniqueness", false);
          setActiveStep(STORE_CONFIG_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        No
      </button>
    </>
  );
}

export default Uniqueness;
