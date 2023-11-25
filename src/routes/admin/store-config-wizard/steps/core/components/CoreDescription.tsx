import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const CoreDescription = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  margin: theme.spacing(2.5),
}));

export default CoreDescription;
