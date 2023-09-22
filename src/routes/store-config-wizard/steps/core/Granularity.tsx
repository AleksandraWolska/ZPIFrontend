import { STORE_CONFIG_STEPS, StoreConfigStep } from "../../types";
import { useStoreConfig } from "../../StoreConfigProvider";
import { calculateProgress } from "./utils";

function Granularity({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { appendCoreAttribute, withdrawToCoreStep } = useStoreConfig();

  return (
    <>
      <div>Granularity - True or False?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.FLEXIBILITY;
          withdrawToCoreStep(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.GRANULARITY, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          appendCoreAttribute("granularity", true);
          const nextStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.GRANULARITY, nextStep),
          );
        }}
      >
        True
      </button>

      <button
        type="button"
        onClick={() => {
          appendCoreAttribute("granularity", false);
          const nextStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.GRANULARITY, nextStep),
          );
        }}
      >
        False
      </button>
    </>
  );
}

export default Granularity;
