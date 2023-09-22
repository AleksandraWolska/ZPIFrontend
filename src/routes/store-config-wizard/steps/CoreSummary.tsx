import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { useStoreConfig } from "../StoreConfigProvider";

function CoreSummary({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { storeConfig, withdrawToCoreConfig } = useStoreConfig();

  return (
    <>
      <h4>You specified core config of your schema!</h4>

      <p>Proceed to set attributes of the entity of your offer.</p>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            storeConfig.coreConfig.periodicity !== undefined
              ? STORE_CONFIG_STEPS.PERIODICITY
              : storeConfig.coreConfig.specificReservation !== undefined
              ? STORE_CONFIG_STEPS.SPECIFIC_RESERVATION
              : STORE_CONFIG_STEPS.UNIQUENESS;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
        }}
      >
        Back
      </button>

      <button
        type="button"
        onClick={() => {
          setActiveStep(STORE_CONFIG_STEPS.ATTRIBUTES);
        }}
      >
        Next
      </button>
    </>
  );
}

export default CoreSummary;
