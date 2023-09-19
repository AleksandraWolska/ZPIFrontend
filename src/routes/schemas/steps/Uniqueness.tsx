import { useUserAppConfig } from "../UserAppConfigProvider";
import { USER_APP_CONFIG_STEPS, UserAppConfigStep } from "../types";
import { calculateProgress } from "./utils";

function Uniqueness({
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
      <div>Uniqueness - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            userAppConfig.coreConfig.simultaneous === false
              ? USER_APP_CONFIG_STEPS.GAP_BETWEEN
              : USER_APP_CONFIG_STEPS.SIMULTANEOUS;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(USER_APP_CONFIG_STEPS.UNIQUENESS, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("uniqueness", true);
          setActiveStep(USER_APP_CONFIG_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("uniqueness", false);
          setActiveStep(USER_APP_CONFIG_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        No
      </button>
    </>
  );
}

export default Uniqueness;
