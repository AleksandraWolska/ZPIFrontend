import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const WizardStepDescription = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  margin: theme.spacing(1.25),
}));

export default WizardStepDescription;
