import { STORE_CONFIG_STEPS, StoreConfigStep } from "../../types";
import { useStoreConfig } from "../../StoreConfigProvider";
import { calculateProgress } from "./utils";

function ScheduleType({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { appendCoreAttribute, withdrawToCoreStep } = useStoreConfig();

  return (
    <>
      <div>ScheduleType - shortSlots or multiDay?</div>

      <button
        type="button"
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.FLEXIBILITY;
          withdrawToCoreStep(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.SCHEDULE_TYPE, prevStep),
          );
        }}
      >
        BACK
      </button>

      <button
        type="button"
        onClick={() => {
          appendCoreAttribute({ scheduleType: "shortSlots" });
          const nextStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.SCHEDULE_TYPE, nextStep),
          );
        }}
      >
        shortSlots
      </button>

      <button
        type="button"
        onClick={() => {
          appendCoreAttribute({ scheduleType: "multiDay" });
          const nextStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
          setActiveStep(nextStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.SCHEDULE_TYPE, nextStep),
          );
        }}
      >
        multiDay
      </button>
    </>
  );
}

export default ScheduleType;
