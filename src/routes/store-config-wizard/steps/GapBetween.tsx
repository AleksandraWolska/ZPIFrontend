import { useStoreConfig } from "../StoreConfigProvider";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { calculateProgress } from "./utils";

function GapBetween({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { setCoreConfigAttribute, withdrawToCoreConfig } = useStoreConfig();

  return (
    <>
      <div>Gap between - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.GAP_BETWEEN, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("gapBetween", true);
          const nextStep = STORE_CONFIG_STEPS.UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.GAP_BETWEEN, nextStep),
          );
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("gapBetween", false);
          const nextStep = STORE_CONFIG_STEPS.UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.GAP_BETWEEN, nextStep),
          );
        }}
      >
        No
      </button>
    </>
  );
}

export default GapBetween;
