import { useUserAppConfig } from "../UserAppConfigProvider";
import { USER_APP_CONFIG_STEPS, UserAppConfigStep } from "../types";
import { calculateProgress } from "./utils";

function GapBetween({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: UserAppConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { setCoreConfigAttribute, withdrawToCoreConfig } = useUserAppConfig();

  return (
    <>
      <div>Gap between - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = USER_APP_CONFIG_STEPS.SIMULTANEOUS;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(USER_APP_CONFIG_STEPS.GAP_BETWEEN, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("gapBetween", true);
          const nextStep = USER_APP_CONFIG_STEPS.UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(USER_APP_CONFIG_STEPS.GAP_BETWEEN, nextStep),
          );
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("gapBetween", false);
          const nextStep = USER_APP_CONFIG_STEPS.UNIQUENESS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(USER_APP_CONFIG_STEPS.GAP_BETWEEN, nextStep),
          );
        }}
      >
        No
      </button>
    </>
  );
}

export default GapBetween;
