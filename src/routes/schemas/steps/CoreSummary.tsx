import { USER_APP_CONFIG_STEPS, UserAppConfigStep } from "../types";
import { useUserAppConfig } from "../UserAppConfigProvider";

function CoreSummary({
  setActiveStep,
}: {
  setActiveStep: (step: UserAppConfigStep) => void;
}) {
  const { userAppConfig, withdrawToCoreConfig } = useUserAppConfig();

  return (
    <>
      <h4>You specified core config of your schema!</h4>

      <p>Proceed to set attributes of the entity of your offer.</p>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            userAppConfig.coreConfig.periodicity !== undefined
              ? USER_APP_CONFIG_STEPS.PERIODICITY
              : userAppConfig.coreConfig.specificReservation !== undefined
              ? USER_APP_CONFIG_STEPS.SPECIFIC_RESERVATION
              : USER_APP_CONFIG_STEPS.UNIQUENESS;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
        }}
      >
        Back
      </button>

      <button
        type="button"
        onClick={() => {
          setActiveStep(USER_APP_CONFIG_STEPS.ATTRIBUTES);
        }}
      >
        Next
      </button>
    </>
  );
}

export default CoreSummary;
