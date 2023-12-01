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

function Simultaneous({
  setActiveStep,
  setProgress,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
  setProgress: (progress: number) => void;
}) {
  const { t } = useTranslation();

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

      <WizardStepTitle>{t("admin.wizard.simultaneous.title")}</WizardStepTitle>

      <InfoButton onClick={() => setShowInfo(!showInfo)} />

      <CoreDescriptionWrapper>
        <CoreDescription>{t("admin.wizard.simultaneous.desc")}</CoreDescription>

        <CoreInfo
          show={showInfo}
          left={t("admin.wizard.simultaneous.sharedDesc")}
          right={t("admin.wizard.simultaneous.exclusiveDesc")}
        />
      </CoreDescriptionWrapper>

      <ChoiceButtonsContainer>
        <ChoiceButton
          text={t("admin.wizard.simultaneous.shared")}
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
          text={t("admin.wizard.simultaneous.exclusive")}
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
