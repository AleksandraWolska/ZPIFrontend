import { USER_APP_CONFIG_STEPS, UserAppConfigStep } from "../types";
import { useUserAppConfig } from "../UserAppConfigProvider";
import { calculateProgress } from "./utils";

function Granularity({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: UserAppConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { setCoreConfigAttribute, withdrawToCoreConfig } = useUserAppConfig();

  return (
    <>
      <div>Granularity - True or False?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = USER_APP_CONFIG_STEPS.FLEXIBILITY;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(USER_APP_CONFIG_STEPS.GRANULARITY, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("granularity", true);
          const nextStep = USER_APP_CONFIG_STEPS.SIMULTANEOUS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(USER_APP_CONFIG_STEPS.GRANULARITY, nextStep),
          );
        }}
      >
        True
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("granularity", false);
          const nextStep = USER_APP_CONFIG_STEPS.SIMULTANEOUS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(USER_APP_CONFIG_STEPS.GRANULARITY, nextStep),
          );
        }}
      >
        False
      </button>
    </>
  );
}

export default Granularity;
