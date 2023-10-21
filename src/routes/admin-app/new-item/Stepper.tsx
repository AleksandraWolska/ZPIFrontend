import { useState } from "react";
import { Stepper as MUIStepper, Step, StepLabel, Box } from "@mui/material";
import GeneralInfo from "./steps/GeneralInfo";
import CustomAttributes from "./steps/CustomAttributes";
import useItemConfig from "./useItemConfig";
import SubItems from "./steps/SubItems";
import Schedule from "./steps/Schedule";
import ChangePageButtons from "../../../shared-components/ChangePageButtons";
import Summary from "./steps/Summary";
import { askForSubItems } from "./NewItemProvider";

function Stepper() {
  const [activeStep, setActiveStep] = useState(0);
  const goNext = () => setActiveStep((prev) => prev + 1);
  const goPrev = () => setActiveStep((prev) => prev - 1);

  const { core } = useItemConfig();

  const getSteps = () => {
    const steps = [];

    steps.push({
      label: "General Info",
      component: <GeneralInfo />,
    });
    steps.push({
      label: "Custom Attributes",
      component: <CustomAttributes />,
    });
    if (askForSubItems(core))
      steps.push({
        label: "Sub Items",
        component: <SubItems />,
      });
    steps.push({
      label: "Schedule",
      component: <Schedule />,
    });
    steps.push({
      label: "Summary",
      component: <Summary />,
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
