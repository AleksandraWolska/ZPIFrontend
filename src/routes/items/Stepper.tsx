import { useState } from "react";
import { Stepper as MUIStepper, Step, StepLabel } from "@mui/material";
import GeneralInfo from "./steps/GeneralInfo";
import useNewItemReducer from "./useNewItemReducer";
import CustomAttributes from "./steps/CustomAttributes";

const steps = [
  { label: "General Info" },
  { label: "Custom Attributes" },
  { label: "Schedule" },
];

function Stepper() {
  const [activeStep, setActiveStep] = useState(0);
  const goNext = () => setActiveStep((prev) => prev + 1);
  const goPrev = () => setActiveStep((prev) => prev - 1);

  const { newItem, setAttribute, setCustomAttribute } = useNewItemReducer();

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
            setCustomAttribute={setCustomAttribute}
            goNext={goNext}
            goPrev={goPrev}
          />
        );
      case 2:
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

export default Stepper;
