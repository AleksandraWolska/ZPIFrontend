import { useState } from "react";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../../types";
import { useStoreConfig } from "../../StoreConfigProvider";
import { calculateProgress } from "./utils";
import StepContentWrapper from "../components/StepContentWrapper";
import WizardStepTitle from "../components/WizardStepTitle";
import BackButton from "../components/BackButton";
import InfoButton from "./components/InfoButton";
import CoreInfo from "./components/CoreInfo";
import CoreDescriptionWrapper from "./components/CoreDescriptionWrapper";
import ChoiceButton from "./components/ChoiceButton";
import ChoiceButtonsContainer from "./components/ChoiceButtonsContainer";
import CoreDescription from "./components/CoreDescription";

function Granularity({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { appendCoreAttribute, withdrawToCoreStep } = useStoreConfig();
  const [showInfo, setShowInfo] = useState(false);
  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.FLEXIBILITY;
          withdrawToCoreStep(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.GRANULARITY, prevStep),
          );
        }}
      />

      <WizardStepTitle>Time Interval Restriction</WizardStepTitle>

      <InfoButton onClick={() => setShowInfo(!showInfo)} />

      <CoreDescriptionWrapper>
        <CoreDescription>
          This setting decides the flexibility in the length of time an item can
          be reserved. Item can be booked for granular time intervals or allow
          user to freely choose reservation time ranges
        </CoreDescription>

        <CoreInfo
          show={showInfo}
          left="Granular should be chosen if you want the item to be booked for
                multiplication of specific time intervals, like an hour."
          right="Continuous should be chosen if you want to allow reservations
                for any length of time. This offers more flexibility for the
                user."
        />
      </CoreDescriptionWrapper>

      <ChoiceButtonsContainer>
        <ChoiceButton
          text="Granular"
          onClick={() => {
            appendCoreAttribute("granularity", true);
            const nextStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.GRANULARITY, nextStep),
            );
          }}
        />

        <ChoiceButton
          text="Continuous"
          onClick={() => {
            appendCoreAttribute("granularity", false);
            const nextStep = STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.GRANULARITY, nextStep),
            );
          }}
        />
      </ChoiceButtonsContainer>
    </StepContentWrapper>
  );
}

export default Granularity;
