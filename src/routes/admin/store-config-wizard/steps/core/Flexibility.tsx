import { useState } from "react";
import { useTranslation } from "react-i18next";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../../types";
import { useStoreConfig } from "../../StoreConfigProvider";
import { calculateProgress } from "../utils";
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
  const { t } = useTranslation();

  const { appendCoreAttribute } = useStoreConfig();

  const [showInfo, setShowInfo] = useState(true);

  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => {
          const prevStep = STORE_CONFIG_STEPS.GENERAL_STORE_INFO;
          setActiveStep(prevStep);
          setProgress(
            calculateProgress(STORE_CONFIG_STEPS.FLEXIBILITY, prevStep),
          );
        }}
      />

      <WizardStepTitle>{t("admin.wizard.flexibility.title")}</WizardStepTitle>

      <InfoButton onClick={() => setShowInfo(!showInfo)} />

      <CoreDescriptionWrapper>
        <CoreDescription>{t("admin.wizard.flexibility.desc")}</CoreDescription>

        <CoreInfo
          show={showInfo}
          left={t("admin.wizard.flexibility.flexibleDesc")}
          right={t("admin.wizard.flexibility.fixedDesc")}
        />
      </CoreDescriptionWrapper>

      <ChoiceButtonsContainer>
        <ChoiceButton
          text={t("admin.wizard.flexibility.flexible")}
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
          text={t("admin.wizard.flexibility.fixed")}
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
