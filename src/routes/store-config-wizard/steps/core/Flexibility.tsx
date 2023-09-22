import { STORE_CONFIG_STEPS, StoreConfigStep } from "../../types";
import { useStoreConfig } from "../../StoreConfigProvider";
import { calculateProgress } from "./utils";

function Flexibility({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { appendCoreAttribute } = useStoreConfig();

  return (
    <>
      <div>Flexibility - True or False?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.OWNER;
          setActiveStep(prevStep);
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          appendCoreAttribute("flexibility", true);
          const nextStep = STORE_CONFIG_STEPS.GRANULARITY;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.FLEXIBILITY, nextStep),
          );
        }}
      >
        True
      </button>

      <button
        type="button"
        onClick={() => {
          appendCoreAttribute("flexibility", false);
          const nextStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.FLEXIBILITY, nextStep),
          );
        }}
      >
        False
      </button>
    </>
  );
}

export default Flexibility;
