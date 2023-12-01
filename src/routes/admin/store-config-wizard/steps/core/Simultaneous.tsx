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

function Simultaneous({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { storeConfig, appendCoreAttribute, withdrawToCoreStep } =
    useStoreConfig();
  const [showInfo, setShowInfo] = useState(false);
  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => {
          const prevStep =
            storeConfig.core.allowOverNight !== undefined
              ? STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT
              : storeConfig.core.granularity !== undefined
              ? STORE_CONFIG_STEPS.GRANULARITY
              : STORE_CONFIG_STEPS.FLEXIBILITY;
          withdrawToCoreStep(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.SIMULTANEOUS, prevStep),
          );
        }}
      />

      <WizardStepTitle>Simultaneous Access</WizardStepTitle>

      <InfoButton onClick={() => setShowInfo(!showInfo)} />

      <CoreDescriptionWrapper>
        <CoreDescription>
          This field determines whether multiple users can be signed up for an
          item at the same time. It is crucial for managing the accessibility of
          your item.
        </CoreDescription>

        <CoreInfo
          show={showInfo}
          left="Shared access should be chosen if you want multiple individuals
                to access the item simultaneously. This is best suited for items
                that can be shared, like a public spaces."
          right="Exclusive access should be chosen if you want allow only one
                user at the time to access the item, ensuring that the user has
                the item all to themselves."
        />
      </CoreDescriptionWrapper>

      <ChoiceButtonsContainer>
        <ChoiceButton
          text="Shared"
          onClick={() => {
            appendCoreAttribute("simultaneous", true);
            const nextStep =
              storeConfig.core.flexibility === false
                ? STORE_CONFIG_STEPS.SPECIFIC_RESERVATION
                : STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.SIMULTANEOUS, nextStep),
            );
          }}
        />

        <ChoiceButton
          text="Exclusive"
          onClick={() => {
            appendCoreAttribute("simultaneous", false);
            const nextStep =
              storeConfig.core.flexibility === false
                ? STORE_CONFIG_STEPS.PERIODICITY
                : STORE_CONFIG_STEPS.UNIQUENESS;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(STORE_CONFIG_STEPS.SIMULTANEOUS, nextStep),
            );
          }}
        />
      </ChoiceButtonsContainer>
    </StepContentWrapper>
  );
}

export default Simultaneous;
