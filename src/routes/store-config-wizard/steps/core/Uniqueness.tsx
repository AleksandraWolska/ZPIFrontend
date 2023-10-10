import { useStoreConfig } from "../../StoreConfigProvider";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../../types";
import { calculateProgress } from "./utils";

function Uniqueness({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { appendCoreAttribute, withdrawToCoreStep } = useStoreConfig();

  return (
    <>
      <div>Uniqueness - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
          withdrawToCoreStep(prevStep);
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
          appendCoreAttribute({ uniqueness: true });
          setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC);
          setProgress(100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          appendCoreAttribute({ uniqueness: false });
          setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC);
          setProgress(100);
        }}
      >
        No
      </button>
    </>
  );
}

export default Uniqueness;
