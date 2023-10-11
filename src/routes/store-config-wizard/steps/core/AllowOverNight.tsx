import { STORE_CONFIG_STEPS, StoreConfigStep } from "../../types";
import { useStoreConfig } from "../../StoreConfigProvider";
import { calculateProgress } from "./utils";

function AllowOverNight({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { appendCoreAttribute, withdrawToCoreStep } = useStoreConfig();

  return (
    <>
      <div>Allow over night - True or False?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.GRANULARITY;
          withdrawToCoreStep(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          appendCoreAttribute("allowOverNight", true);
          const nextStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT, nextStep),
          );
        }}
      >
        True
      </button>

      <button
        type="button"
        onClick={() => {
          appendCoreAttribute("allowOverNight", false);
          const nextStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT, nextStep),
          );
        }}
      >
        False
      </button>
    </>
  );
}

export default AllowOverNight;
