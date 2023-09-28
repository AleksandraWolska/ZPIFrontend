import { Box, Typography } from "@mui/material";
import { FetchedJsonMainPage } from "../../../types";
import { jsonStringMainPage } from "../mocks/responseMainPage";

function WelcomeTexts() {
  const jsonData: FetchedJsonMainPage = JSON.parse(jsonStringMainPage);

  return (
    <Box>
      <Typography variant="h6">
        {jsonData.data.storeConfig.mainPage.welcomeTextLine1}
      </Typography>
      {jsonData.data.storeConfig.mainPage.welcomeTextLine2 && (
        <Typography variant="body1" color="orange">
          {jsonData.data.storeConfig.mainPage.welcomeTextLine1}
        </Typography>
      )}
    </Box>
  );
}
export default WelcomeTexts;
