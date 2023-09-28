import { Box, Typography } from "@mui/material";
import useMainPageConfig from "../main-page/useMainPageConfig";

function WelcomeTexts() {
  const config = useMainPageConfig();

  return (
    <Box>
      <Typography variant="h6">{config.mainPage.welcomeTextLine1}</Typography>
      {config.mainPage.welcomeTextLine2 && (
        <Typography variant="body1" color="orange">
          {config.mainPage.welcomeTextLine1}
        </Typography>
      )}
    </Box>
  );
}

export default WelcomeTexts;
