import { Box, Typography } from "@mui/material";
import {
  FetchedJsonFirstScreen,
  UserAppBuilderConfig,
} from "../mocks/userapp_types";
import { jsonString } from "../mocks/json_template";

function WelcomeTexts() {
  const jsonData: FetchedJsonFirstScreen = JSON.parse(jsonString);
  const b: UserAppBuilderConfig = jsonData.userapp_builder_config;

  return (
    <Box>
      <Typography variant="h6">{b.layoutConfig.welcomeTextLine1}</Typography>
      {b.layoutConfig.welcomeTextLine2 && (
        <Typography variant="body1" color="orange">
          {b.layoutConfig.welcomeTextLine2}
        </Typography>
      )}
    </Box>
  );
}
export default WelcomeTexts;
