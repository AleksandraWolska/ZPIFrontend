import { Box, Typography } from "@mui/material";
import { MainPage } from "../../../types";

type WelcomeTextsProps = {
  config: MainPage;
};

function WelcomeTexts({ config }: WelcomeTextsProps) {
  return (
    <Box>
      <Typography variant="h6">{config.welcomeTextLine1}</Typography>
      {config.welcomeTextLine2 && (
        <Typography variant="body1" color="orange">
          {config.welcomeTextLine2}
        </Typography>
      )}
    </Box>
  );
}
export default WelcomeTexts;
