import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useUserAppConfig } from "../UserAppConfigProvider";
import { USER_APP_CONFIG_STEPS, UserAppConfigStep } from "../types";

function RatingAndComments({
  setActiveStep,
}: {
  setActiveStep: (step: UserAppConfigStep) => void;
}) {
  const { userAppConfig, setRatingOptions, setCommentsOptions } =
    useUserAppConfig();

  return (
    <>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={userAppConfig.ratingOptions.allowRating}
              onChange={(e) => {
                setRatingOptions({ allowRating: e.target.checked });
              }}
            />
          }
          label="allowRating"
        />

        {userAppConfig.ratingOptions.allowRating && (
          <FormControlLabel
            control={
              <Checkbox
                checked={userAppConfig.ratingOptions.showRating}
                onChange={(e) => {
                  setRatingOptions({ showRating: e.target.checked });
                }}
              />
            }
            label="showRating"
          />
        )}
      </FormGroup>

      <Divider />

      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={userAppConfig.commentsOptions.allowComments}
              onChange={(e) => {
                setCommentsOptions({ allowComments: e.target.checked });
              }}
            />
          }
          label="allowComments"
        />

        {userAppConfig.commentsOptions.allowComments && (
          <FormControlLabel
            control={
              <Checkbox
                checked={userAppConfig.commentsOptions.showComments}
                onChange={(e) => {
                  setCommentsOptions({ showComments: e.target.checked });
                }}
              />
            }
            label="showComments"
          />
        )}
      </FormGroup>

      <Button
        onClick={() => {
          setActiveStep(USER_APP_CONFIG_STEPS.ATTRIBUTES);
        }}
      >
        Back
      </Button>

      <Button
        onClick={() => {
          setActiveStep(USER_APP_CONFIG_STEPS.PRINT_SCHEMA);
        }}
      >
        Next
      </Button>
    </>
  );
}

export default RatingAndComments;
