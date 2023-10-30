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

function SpecificReservation({
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
            calculateProgress(
              STORE_CONFIG_STEPS.SPECIFIC_RESERVATION,
              prevStep,
            ),
          );
        }}
      />

      <WizardStepTitle>Specific Reservation</WizardStepTitle>

      <InfoButton onClick={() => setShowInfo(!showInfo)} />

      <CoreDescriptionWrapper>
        <CoreDescription>
          This field defines whether users can book specific parts of an item,
          eq. seats for a movie.
        </CoreDescription>

        <CoreInfo
          show={showInfo}
          left="Select yes if you want users to reserve specific places or parts
                within an item. This is best suited for venues with specific
                seating."
          right="Select no if you want the item or event to be treated as a
                whole, with no sub-item reservations possible."
        />
      </CoreDescriptionWrapper>

      <ChoiceButtonsContainer>
        <ChoiceButton
          text="Yes"
          onClick={() => {
            appendCoreAttribute("specificReservation", true);
            const nextStep = STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC;
            setActiveStep(nextStep);
            setProgress(100);
          }}
        />

        <ChoiceButton
          text="No"
          onClick={() => {
            appendCoreAttribute("specificReservation", false);
            const nextStep = STORE_CONFIG_STEPS.PERIODICITY;
            setActiveStep(nextStep);
            setProgress(
              calculateProgress(
                STORE_CONFIG_STEPS.SPECIFIC_RESERVATION,
                nextStep,
              ),
            );
          }}
        />
      </ChoiceButtonsContainer>
    </StepContentWrapper>
  );
}

export default SpecificReservation;
