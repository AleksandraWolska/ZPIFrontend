import { USER_APP_CONFIG_STEPS, UserAppConfigStep } from "../types";
import { useUserAppConfig } from "../UserAppConfigProvider";
import { calculateProgress } from "./utils";

function Simultaneous({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: UserAppConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { userAppConfig, setCoreConfigAttribute, withdrawToCoreConfig } =
    useUserAppConfig();

  return (
    <>
      <div>Simultaneous - True or False?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            userAppConfig.coreConfig.granularity !== undefined
              ? USER_APP_CONFIG_STEPS.GRANULARITY
              : USER_APP_CONFIG_STEPS.FLEXIBILITY;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(USER_APP_CONFIG_STEPS.SIMULTANEOUS, prevStep),
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
            userAppConfig.coreConfig.flexibility === false
              ? USER_APP_CONFIG_STEPS.SPECIFIC_RESERVATION
              : USER_APP_CONFIG_STEPS.UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(USER_APP_CONFIG_STEPS.SIMULTANEOUS, nextStep),
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
            userAppConfig.coreConfig.flexibility === false
              ? USER_APP_CONFIG_STEPS.PERIODICITY
              : USER_APP_CONFIG_STEPS.GAP_BETWEEN;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(USER_APP_CONFIG_STEPS.SIMULTANEOUS, nextStep),
          );
        }}
      >
        False
      </button>
    </>
  );
}

export default Simultaneous;
