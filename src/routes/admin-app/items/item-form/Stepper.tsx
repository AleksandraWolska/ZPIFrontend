import { ReactNode, useState } from "react";
import { Box, Step, StepLabel, Stepper as MUIStepper } from "@mui/material";
import ChangePageButtons from "../../../../shared-components/ChangePageButtons";

function Stepper({
  steps,
}: {
  steps: { label: string; component: ReactNode }[];
}) {
  const [activeStep, setActiveStep] = useState(0);
  const goNext = () => setActiveStep((prev) => prev + 1);
  const goPrev = () => setActiveStep((prev) => prev - 1);

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
