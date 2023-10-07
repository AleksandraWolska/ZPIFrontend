import { useState } from "react";
import { Stepper as MUIStepper, Step, StepLabel } from "@mui/material";
import GeneralInfo from "./steps/GeneralInfo";
import useNewItemSchema from "./useNewItemSchema";
import CustomAttributes from "./steps/CustomAttributes";
import useNewItemConfig from "./useNewItemConfig";
import SubItems from "./steps/SubItems";

function Stepper() {
  const { customAttributesSpec } = useNewItemConfig();

  const [activeStep, setActiveStep] = useState(0);
  const goNext = () => setActiveStep((prev) => prev + 1);
  const goPrev = () => setActiveStep((prev) => prev - 1);

  const {
    newItemSchema,
    setItemAttribute,
    setItemCustomAttribute,
    setItemOption,
  } = useNewItemSchema();
  const showSubItems = "subItemList" in newItemSchema.item;
  const steps = getSteps(showSubItems);

  console.log("stepper", newItemSchema);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <GeneralInfo
            newItemSchema={newItemSchema}
            setItemAttribute={setItemAttribute}
            setItemOption={setItemOption}
            goNext={goNext}
          />
        );
      case 1:
        return (
          <CustomAttributes
            newItem={newItemSchema.item}
            customAttributesSpec={customAttributesSpec}
            setItemCustomAttribute={setItemCustomAttribute}
            goNext={goNext}
            goPrev={goPrev}
          />
        );
      case 2:
        return showSubItems ? (
          <SubItems
            newItemSchema={newItemSchema.item}
            setItemAttribute={setItemAttribute}
            goNext={goNext}
            goPrev={goPrev}
          />
        ) : (
          <div>Summary</div>
        );
      case 3:
        return <div>Summary</div>;
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

const getSteps = (showSubItems: boolean) => {
  const steps = [
    { label: "General Info" },
    { label: "Custom Attributes" },
    { label: "Summary" },
  ];

  if (showSubItems) steps.splice(2, 0, { label: "Sub Items" });

  return steps;
};

export default Stepper;
