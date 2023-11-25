import { ReactNode, useState } from "react";
import {
  Box,
  Step,
  StepLabel,
  Stepper as MUIStepper,
  Container,
} from "@mui/material";
import ChangePageButtons from "../../components/ChangePageButtons";

function Stepper({
  steps,
}: {
  steps: { label: string; component: ReactNode }[];
}) {
  const [activeStep, setActiveStep] = useState(0);
  const goNext = () => setActiveStep((prev) => prev + 1);
  const goPrev = () => setActiveStep((prev) => prev - 1);

  return (
    <Container>
      <Box>
        <MUIStepper activeStep={activeStep} alternativeLabel sx={{ margin: 1 }}>
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
      </Box>
    </Container>
  );
}

export default Stepper;
