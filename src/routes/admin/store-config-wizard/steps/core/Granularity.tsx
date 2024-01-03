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
  const { t } = useTranslation();

  const { appendCoreAttribute, withdrawToCoreStep } = useStoreConfig();
  const [showInfo, setShowInfo] = useState(true);
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

      <WizardStepTitle>{t("admin.wizard.granularity.title")}</WizardStepTitle>

      <InfoButton onClick={() => setShowInfo(!showInfo)} />

      <CoreDescriptionWrapper>
        <CoreDescription>{t("admin.wizard.granularity.desc")}</CoreDescription>

        <CoreInfo
          show={showInfo}
          left={t("admin.wizard.granularity.granularDesc")}
          right={t("admin.wizard.granularity.continuousDesc")}
        />
      </CoreDescriptionWrapper>

      <ChoiceButtonsContainer>
        <ChoiceButton
          text={t("admin.wizard.granularity.granular")}
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
          text={t("admin.wizard.granularity.continuous")}
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
