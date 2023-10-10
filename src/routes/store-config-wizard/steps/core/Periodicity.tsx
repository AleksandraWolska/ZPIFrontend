import { STORE_CONFIG_STEPS, StoreConfigStep } from "../../types";
import { useStoreConfig } from "../../StoreConfigProvider";
import { calculateProgress } from "./utils";

function Periodicity({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { storeConfig, appendCoreAttribute, withdrawToCoreStep } =
    useStoreConfig();

  return (
    <>
      <div>Periodicity - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            storeConfig.core.simultaneous === false
              ? STORE_CONFIG_STEPS.SIMULTANEOUS
              : STORE_CONFIG_STEPS.SPECIFIC_RESERVATION;
          withdrawToCoreStep(prevStep);
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
          appendCoreAttribute({ periodicity: true });
          setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC);
          setProgress(100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          appendCoreAttribute({ periodicity: false });
          setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC);
          setProgress(100);
        }}
      >
        No
      </button>
    </>
  );
}

export default Periodicity;
