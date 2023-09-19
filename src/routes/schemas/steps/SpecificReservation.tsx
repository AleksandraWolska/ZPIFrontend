import { useUserAppConfig } from "../UserAppConfigProvider";
import { USER_APP_CONFIG_STEPS, UserAppConfigStep } from "../types";
import { calculateProgress } from "./utils";

function SpecificReservation({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: UserAppConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { setCoreConfigAttribute, withdrawToCoreConfig } = useUserAppConfig();

  return (
    <>
      <div>Specific reservation - Yes or No?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = USER_APP_CONFIG_STEPS.SIMULTANEOUS;
          withdrawToCoreConfig(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(
              USER_APP_CONFIG_STEPS.SPECIFIC_RESERVATION,
              prevStep,
            ),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("specificReservation", true);
          const nextStep = USER_APP_CONFIG_STEPS.CORE_SUMMARY;
          setActiveStep(nextStep);
          setProgress(100);
        }}
      >
        Yes
      </button>

      <button
        type="button"
        onClick={() => {
          setCoreConfigAttribute("specificReservation", false);
          const nextStep = USER_APP_CONFIG_STEPS.PERIODICITY;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(
              USER_APP_CONFIG_STEPS.SPECIFIC_RESERVATION,
              nextStep,
            ),
          );
        }}
      >
        No
      </button>
    </>
  );
}

export default SpecificReservation;
