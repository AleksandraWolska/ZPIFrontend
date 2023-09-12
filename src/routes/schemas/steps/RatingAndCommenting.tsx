import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";

function RatingAndCommenting({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
}) {
  const { schema, setRatingOptions } = useSchema();

  return (
    <>
      <FormGroup>
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

export default RatingAndCommenting;
