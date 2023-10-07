import { useState } from "react";
import { Stepper as MUIStepper, Step, StepLabel } from "@mui/material";
import GeneralInfo from "./steps/GeneralInfo";
import useNewItemSchema from "./useNewItemSchema";
import CustomAttributes from "./steps/CustomAttributes";
import useNewItemConfig from "./useNewItemConfig";
import SubItems from "./steps/SubItems";
import Schedule from "./steps/schedule/Schedule";
import { askForDate, askForSubItems } from "./utils";

function Stepper() {
  const [activeStep, setActiveStep] = useState(0);
  const goNext = () => setActiveStep((prev) => prev + 1);
  const goPrev = () => setActiveStep((prev) => prev - 1);

  const { core, customAttributesSpec } = useNewItemConfig();

  const {
    newItemSchema,
    setItemAttribute,
    setItemCustomAttribute,
    setItemOption,
  } = useNewItemSchema();

  console.log("stepper", newItemSchema);

  const getSteps = () => {
    const steps = [];

    steps.push({
      label: "General Info",
      component: (
        <GeneralInfo
          newItemSchema={newItemSchema}
          core={core}
          setItemAttribute={setItemAttribute}
          setItemOption={setItemOption}
          goNext={goNext}
        />
      ),
    });
    steps.push({
      label: "Custom Attributes",
      component: (
        <CustomAttributes
          newItem={newItemSchema.item}
          customAttributesSpec={customAttributesSpec}
          setItemCustomAttribute={setItemCustomAttribute}
          goNext={goNext}
          goPrev={goPrev}
        />
      ),
    });
    if (askForSubItems(core))
      steps.push({
        label: "Sub Items",
        component: (
          <SubItems
            newItemSchema={newItemSchema.item}
            setItemAttribute={setItemAttribute}
            goNext={goNext}
            goPrev={goPrev}
          />
        ),
      });
    if (!askForDate(core))
      steps.push({
        label: "Schedule",
        component: (
          <Schedule
            newItemSchedule={newItemSchema.options.schedule}
            setItemOption={setItemOption}
            goNext={goNext}
            goPrev={goPrev}
          />
        ),
      });
    steps.push({ label: "Summary", component: <div>Summary</div> });

    return steps;
  };

  const steps = getSteps();

  return (
    <>
      <MUIStepper activeStep={activeStep} alternativeLabel>
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MUIStepper>
      {steps[activeStep].component}
    </>
  );
}

export default Stepper;
