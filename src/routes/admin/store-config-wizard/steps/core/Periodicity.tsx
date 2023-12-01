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

function Periodicity({
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

      <WizardStepTitle>{t("admin.wizard.periodicity.title")}</WizardStepTitle>

      <InfoButton onClick={() => setShowInfo(!showInfo)} />

      <CoreDescriptionWrapper>
        <CoreDescription>{t("admin.wizard.periodicity.desc")}</CoreDescription>

        <CoreInfo
          show={showInfo}
          left={t("admin.wizard.periodicity.cyclicDesc")}
          right={t("admin.wizard.periodicity.noncyclicDesc")}
        />
      </CoreDescriptionWrapper>

      <ChoiceButtonsContainer>
        <ChoiceButton
          text={t("admin.wizard.periodicity.cyclic")}
          onClick={() => {
            appendCoreAttribute("periodicity", true);
            setActiveStep(STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC);
            setProgress(100);
          }}
        />

        <ChoiceButton
          text={t("admin.wizard.periodicity.noncyclic")}
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
