import { ReactNode } from "react";
import { Typography } from "@mui/material";

function WizardStepTitle({ children }: { children: ReactNode }) {
  return (
    <Typography variant="h4" sx={{ marginBottom: 1.25 }}>
      {children}
    </Typography>
  );
}

export default WizardStepTitle;
