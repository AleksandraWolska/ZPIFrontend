import { USER_APP_CONFIG_STEPS, UserAppConfigStep } from "../types";
import { useUserAppConfig } from "../UserAppConfigProvider";
import { calculateProgress } from "./utils";

function Flexibility({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: UserAppConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { setCoreConfigAttribute } = useUserAppConfig();

  return (
    <>
      <div>Flexibility - True or False?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = USER_APP_CONFIG_STEPS.LAYOUT_CONFIG;
          setActiveStep(prevStep);
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("flexibility", true);
          const nextStep = USER_APP_CONFIG_STEPS.GRANULARITY;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(USER_APP_CONFIG_STEPS.FLEXIBILITY, nextStep),
          );
        }}
      >
        True
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("flexibility", false);
          const nextStep = USER_APP_CONFIG_STEPS.SIMULTANEOUS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(USER_APP_CONFIG_STEPS.FLEXIBILITY, nextStep),
          );
        }}
      >
        False
      </button>
    </>
  );
}

export default Flexibility;
