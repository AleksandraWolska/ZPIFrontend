import { useState } from "react";
import { Stepper as MUIStepper, Step, StepLabel } from "@mui/material";
import GeneralInfo from "./steps/GeneralInfo";
import useNewItemAttributes from "./useNewItemAttributes";
import CustomAttributes from "./steps/CustomAttributes";
import useNewItem from "./useNewItem";
import SubItems from "./steps/SubItems";
import { Core } from "../../types";

function Stepper() {
  const { core } = useNewItem();
  const showSubItems = shouldShowSubItems(core);
  const steps = getSteps(showSubItems);

  const [activeStep, setActiveStep] = useState(0);
  const goNext = () => setActiveStep((prev) => prev + 1);
  const goPrev = () => setActiveStep((prev) => prev - 1);

  const { newItem, setAttribute, customAttributesSpec, setCustomAttribute } =
    useNewItemAttributes();

  console.log("stepper");

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <GeneralInfo
            newItem={newItem}
            setAttribute={setAttribute}
            goNext={goNext}
          />
        );
      case 1:
        return (
          <CustomAttributes
            newItem={newItem}
            customAttributesSpec={customAttributesSpec}
            setCustomAttribute={setCustomAttribute}
            goNext={goNext}
            goPrev={goPrev}
          />
        );
      case 2:
        return showSubItems ? (
          <SubItems
            newItem={newItem}
            setAttribute={setAttribute}
            goNext={goNext}
            goPrev={goPrev}
          />
        ) : (
          <div>schedule</div>
        );
      case 3:
        return <div>schedule</div>;
      default:
        return <div>Error!</div>;
    }
  };

  return (
    <>
      <MUIStepper activeStep={activeStep} alternativeLabel>
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MUIStepper>
      {renderStepContent()}
    </>
  );
}

const shouldShowSubItems = (core: Core) => {
  const {
    flexibility: f,
    simultaneous: s,
    uniqueness: u,
    periodicity: p,
    specificReservation: r,
  } = core;

  return (
    ((!f && !s && !u && p && !r) ||
      (!f && s && !u && !p && r) ||
      (!f && s && !u && p && !r)) === true
  );
};

const getSteps = (showSubItems: boolean) => {
  const steps = [
    { label: "General Info" },
    { label: "Custom Attributes" },
    { label: "Schedule" },
  ];

  if (showSubItems) steps.splice(2, 0, { label: "Sub Items" });

  return steps;
};

export default Stepper;
