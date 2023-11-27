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
import ChoiceButtonsContainer from "./components/ChoiceButtonsContainer";
import ChoiceButton from "./components/ChoiceButton";
import CoreDescription from "./components/CoreDescription";

function Flexibility({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { appendCoreAttribute } = useStoreConfig();

  const [showInfo, setShowInfo] = useState(false);

  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.GENERAL_STORE_INFO;
          setActiveStep(prevStep);
        }}
      />

      <WizardStepTitle>Time Frame Flexibility</WizardStepTitle>

      <InfoButton onClick={() => setShowInfo(!showInfo)} />

      <CoreDescriptionWrapper>
        <CoreDescription>
          Select whether an item reservation timeframe should be predetermined
          and fixed, or if the user has the flexibility to choose according to
          their preferences.
        </CoreDescription>

        <CoreInfo
          show={showInfo}
          left="Flexible value means that the item can be reserved for a period
                chosen by user within specified time frames."
          right="Fixed value indicates that the item has fixed start and end
                times set by an admin, and users can only sign up for the entire
                duration."
        />
      </CoreDescriptionWrapper>

      <ChoiceButtonsContainer>
        <ChoiceButton
          text="Flexible"
          onClick={() => {
            appendCoreAttribute("flexibility", true);
            const nextStep = STORE_CONFIG_STEPS.GRANULARITY;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.FLEXIBILITY, nextStep),
            );
          }}
        />

        <ChoiceButton
          text="Fixed"
          onClick={() => {
            appendCoreAttribute("flexibility", false);
            const nextStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.FLEXIBILITY, nextStep),
            );
          }}
        />
      </ChoiceButtonsContainer>
    </StepContentWrapper>
  );
}

export default Flexibility;
