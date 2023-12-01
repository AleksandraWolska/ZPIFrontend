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

function Uniqueness({
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
          const prevStep = STORE_CONFIG_STEPS.SIMULTANEOUS;
          withdrawToCoreStep(prevStep);
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.UNIQUENESS, prevStep),
          );
        }}
      />

      <WizardStepTitle>Item Uniqueness</WizardStepTitle>

      <InfoButton onClick={() => setShowInfo(!showInfo)} />

      <CoreDescriptionWrapper>
        <CoreDescription>
          This option defines whether the item is a unique entity or if there
          are multiple indistinguishable items available for users.
        </CoreDescription>

        <CoreInfo
          show={showInfo}
          left="You have one specific item of a type. This is best suited for
                unique items or services."
          right="There are multiple, identical items available. This is best
                suited for items like chairs in a rental place."
        />
      </CoreDescriptionWrapper>

      <ChoiceButtonsContainer>
        <ChoiceButton
          text="Yes"
          onClick={() => {
            appendCoreAttribute("uniqueness", true);
            setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC);
            setProgress(100);
          }}
        />

        <ChoiceButton
          text="No"
          onClick={() => {
            appendCoreAttribute("uniqueness", false);
            setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC);
            setProgress(100);
          }}
        />
      </ChoiceButtonsContainer>
    </StepContentWrapper>
  );
}

export default Uniqueness;
