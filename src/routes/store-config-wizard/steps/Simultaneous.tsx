import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { useStoreConfig } from "../StoreConfigProvider";
import { calculateProgress } from "./utils";

function Simultaneous({
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
      <div>Simultaneous - True or False?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            storeConfig.coreConfig.granularity !== undefined
              ? STORE_CONFIG_STEPS.GRANULARITY
              : STORE_CONFIG_STEPS.FLEXIBILITY;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.SIMULTANEOUS, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("simultaneous", true);
          const nextStep =
            storeConfig.coreConfig.flexibility === false
              ? STORE_CONFIG_STEPS.SPECIFIC_RESERVATION
              : STORE_CONFIG_STEPS.UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.SIMULTANEOUS, nextStep),
          );
        }}
      >
        True
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("simultaneous", false);
          const nextStep =
            storeConfig.coreConfig.flexibility === false
              ? STORE_CONFIG_STEPS.PERIODICITY
              : STORE_CONFIG_STEPS.UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.SIMULTANEOUS, nextStep),
          );
        }}
      >
        False
      </button>
    </>
  );
}

export default Simultaneous;
