import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useSchema } from "../SchemaProvider";
import { SCHEMA_STEPS, SchemaStep } from "../types";

function LayoutConfig({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
}) {
  const { schema, setLayoutConfig } = useSchema();
  const { layoutConfig } = schema;

  return (
    <>
      <Stack alignItems="start" spacing={1}>
        <TextField
          label="name"
          value={layoutConfig.name}
          onChange={(e) => {
            setLayoutConfig({ ...layoutConfig, name: e.target.value });
          }}
        />

        <TextField
          label="welcomeTextLine1"
          value={layoutConfig.welcomeTextLine1}
          onChange={(e) => {
            setLayoutConfig({
              ...layoutConfig,
              welcomeTextLine1: e.target.value,
            });
          }}
        />

        <TextField
          label="welcomeTextLine2"
          value={layoutConfig.welcomeTextLine2}
          onChange={(e) => {
            setLayoutConfig({
              ...layoutConfig,
              welcomeTextLine2: e.target.value,
            });
          }}
        />
      </Stack>

      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

      <Stack direction="row" spacing={1}>
        <TextField
          label="logoSrc"
          value={layoutConfig.logoSrc}
          onChange={(e) => {
            setLayoutConfig({ ...layoutConfig, logoSrc: e.target.value });
          }}
        />

        {layoutConfig.logoSrc && (
          <FormControlLabel
            control={
              <Checkbox
                checked={layoutConfig.showLogo}
                onChange={(e) => {
                  setLayoutConfig({
                    ...layoutConfig,
                    showLogo: e.target.checked,
                  });
                }}
              />
            }
            label="showLogo"
          />
        )}
      </Stack>

      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

      <FormControlLabel
        control={
          <Checkbox
            checked={layoutConfig.enableFiltering}
            onChange={(e) => {
              setLayoutConfig({
                ...layoutConfig,
                enableFiltering: e.target.checked,
              });
            }}
          />
        }
        label="enableFiltering"
      />

      <Button
        sx={{ marginTop: 2, display: "block" }}
        onClick={() => {
          setActiveStep(SCHEMA_STEPS.FLEXIBILITY);
        }}
      >
        Next
      </Button>
    </>
  );
}

export default LayoutConfig;
