import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";

function RatingAndComments({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
}) {
  const { schema, setRatingOptions, setCommentsOptions } = useSchema();

  return (
    <>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={schema.ratingOptions.allowRating}
              onChange={(e) => {
                setRatingOptions({ allowRating: e.target.checked });
              }}
            />
          }
          label="allowRating"
        />

        {schema.ratingOptions.allowRating && (
          <FormControlLabel
            control={
              <Checkbox
                checked={schema.ratingOptions.showRating}
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
              checked={schema.commentsOptions.allowComments}
              onChange={(e) => {
                setCommentsOptions({ allowComments: e.target.checked });
              }}
            />
          }
          label="allowComments"
        />

        {schema.commentsOptions.allowComments && (
          <FormControlLabel
            control={
              <Checkbox
                checked={schema.commentsOptions.showComments}
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
          setActiveStep(SCHEMA_STEPS.CUSTOM_PARAMS);
        }}
      >
        Back
      </Button>

      <Button
        onClick={() => {
          setActiveStep(SCHEMA_STEPS.PRINT_SCHEMA);
        }}
      >
        Next
      </Button>
    </>
  );
}

export default RatingAndComments;
