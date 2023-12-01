import { Box, Typography } from "@mui/material";
import { MainPage } from "../../../../types";

type WelcomeTextsProps = {
  config: MainPage;
};

function WelcomeTexts({ config }: WelcomeTextsProps) {
  return (
    <Box>
      <Typography variant="h3" margin={1}>
        {config.welcomeTextLine1}
      </Typography>
      {config.welcomeTextLine2 && (
        <Typography variant="h5" marginLeft={1}>
          {config.welcomeTextLine2}
        </Typography>
      )}
    </Box>
  );
}
export default WelcomeTexts;
