import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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

      <WizardStepTitle>
        {t("admin.wizard.specificReservation.title")}
      </WizardStepTitle>

      <InfoButton onClick={() => setShowInfo(!showInfo)} />

      <CoreDescriptionWrapper>
        <CoreDescription>
          {t("admin.wizard.specificReservation.desc")}
        </CoreDescription>

        <CoreInfo
          show={showInfo}
          left={t("admin.wizard.specificReservation.yesDesc")}
          right={t("admin.wizard.specificReservation.noDesc")}
        />
      </CoreDescriptionWrapper>

      <ChoiceButtonsContainer>
        <ChoiceButton
          text={t("common.yes")}
          onClick={() => {
            appendCoreAttribute("specificReservation", true);
            const nextStep = STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC;
            setActiveStep(nextStep);
            setProgress(100);
          }}
        />

        <ChoiceButton
          text={t("common.no")}
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
