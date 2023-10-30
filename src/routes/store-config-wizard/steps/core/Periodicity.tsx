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

function Periodicity({
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
            storeConfig.core.simultaneous === false
              ? STORE_CONFIG_STEPS.SIMULTANEOUS
              : STORE_CONFIG_STEPS.SPECIFIC_RESERVATION;
          withdrawToCoreStep(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.PERIODICITY, prevStep),
          );
        }}
      />

      <WizardStepTitle>Event Periodicity</WizardStepTitle>

      <InfoButton onClick={() => setShowInfo(!showInfo)} />

      <CoreDescriptionWrapper>
        <CoreDescription>
          This field determines the cyclical nature of events or bookings.
        </CoreDescription>

        <CoreInfo
          show={showInfo}
          left="Cyclical events are best suited for events that recur over time.
                User can view and book different instances of the same event."
          right="Non cyclical events are best suited for one-time events or
                items. Each item is treated as a separate entity without any
                grouping."
        />
      </CoreDescriptionWrapper>

      <ChoiceButtonsContainer>
        <ChoiceButton
          text="Cyclic"
          onClick={() => {
            appendCoreAttribute("periodicity", true);
            setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC);
            setProgress(100);
          }}
        />

        <ChoiceButton
          text="Noncyclic"
          onClick={() => {
            appendCoreAttribute("periodicity", false);
            setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC);
            setProgress(100);
          }}
        />
      </ChoiceButtonsContainer>
    </StepContentWrapper>
  );
}

export default Periodicity;
