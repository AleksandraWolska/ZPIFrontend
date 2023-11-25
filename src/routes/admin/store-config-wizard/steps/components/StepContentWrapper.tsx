import { Box, styled } from "@mui/system";

const StepContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  marginTop: theme.spacing(2.5),
}));

export default StepContentWrapper;
