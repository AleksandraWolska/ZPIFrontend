import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useStoreConfig } from "../StoreConfigProvider";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";

function RatingAndComments({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { storeConfig, setRatingOptions, setCommentsOptions } =
    useStoreConfig();

  return (
    <>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={storeConfig.ratingOptions.allowRating}
              onChange={(e) => {
                setRatingOptions({ allowRating: e.target.checked });
              }}
            />
          }
          label="allowRating"
        />

        {storeConfig.ratingOptions.allowRating && (
          <FormControlLabel
            control={
              <Checkbox
                checked={storeConfig.ratingOptions.showRating}
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
              checked={storeConfig.commentsOptions.allowComments}
              onChange={(e) => {
                setCommentsOptions({ allowComments: e.target.checked });
              }}
            />
          }
          label="allowComments"
        />

        {storeConfig.commentsOptions.allowComments && (
          <FormControlLabel
            control={
              <Checkbox
                checked={storeConfig.commentsOptions.showComments}
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
          setActiveStep(STORE_CONFIG_STEPS.ATTRIBUTES);
        }}
      >
        Back
      </Button>

      <Button
        onClick={() => {
          setActiveStep(STORE_CONFIG_STEPS.PRINT_SCHEMA);
        }}
      >
        Next
      </Button>
    </>
  );
}

export default RatingAndComments;
