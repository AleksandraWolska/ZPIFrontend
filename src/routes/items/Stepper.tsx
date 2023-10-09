import { useState } from "react";
import { Stepper as MUIStepper, Step, StepLabel, Box } from "@mui/material";
import GeneralInfo from "./steps/GeneralInfo";
import useNewItemSchema from "./useNewItemSchema";
import CustomAttributes from "./steps/CustomAttributes";
import useNewItemConfig from "./useNewItemConfig";
import SubItems from "./steps/SubItems";
import Schedule from "./steps/schedule/Schedule";
import { askForSubItems } from "./utils";
import ChangePageButtons from "../../shared-components/ChangePageButtons";
import Summary from "./steps/Summary";

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
    steps.push({
      label: "Schedule",
      component: (
        <Schedule
          newItemSchedule={newItemSchema.options.schedule}
          setItemOption={setItemOption}
          scheduleType={core.scheduleType}
        />
      ),
    });
    steps.push({
      label: "Summary",
      component: <Summary newItemSchema={newItemSchema} />,
    });

    return steps;
  };

  const steps = getSteps();

  return (
    <>
      <MUIStepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ marginTop: 1 }}
      >
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MUIStepper>

      {steps[activeStep].component}

      <Box marginTop={2}>
        <ChangePageButtons
          onNext={activeStep !== steps.length - 1 ? goNext : undefined}
          onPrev={activeStep !== 0 ? goPrev : undefined}
        />
      </Box>
    </>
  );
}

export default Stepper;
