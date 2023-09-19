import { USER_APP_CONFIG_STEPS, UserAppConfigStep } from "../types";
import { useUserAppConfig } from "../UserAppConfigProvider";
import { calculateProgress } from "./utils";

function Periodicity({
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
      <div>Periodicity - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep =
            userAppConfig.coreConfig.simultaneous === false
              ? USER_APP_CONFIG_STEPS.SIMULTANEOUS
              : USER_APP_CONFIG_STEPS.SPECIFIC_RESERVATION;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(USER_APP_CONFIG_STEPS.PERIODICITY, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("periodicity", true);
          setActiveStep(USER_APP_CONFIG_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("periodicity", false);
          setActiveStep(USER_APP_CONFIG_STEPS.CORE_SUMMARY);
          setProgress(100);
        }}
      >
        No
      </button>
    </>
  );
}

export default Periodicity;
