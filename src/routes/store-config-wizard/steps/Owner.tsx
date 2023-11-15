import { Box, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useStoreConfig } from "../StoreConfigProvider";
import ChangePageButtons from "../../admin/components/ChangePageButtons";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { OWNER_COLORS } from "../../../types";
import WizardStepTitle from "./components/WizardStepTitle";
import WizardStepDescription from "./components/WizardStepDescription";
import StepContentWrapper from "./components/StepContentWrapper";

function Owner({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { storeConfig, setOwnerAttribute } = useStoreConfig();
  const { owner } = storeConfig;

  return (
    <StepContentWrapper>
      <WizardStepTitle>Owner</WizardStepTitle>

      <WizardStepDescription>
        Enter information about your company, link to logo, and choose color
        theme
      </WizardStepDescription>

      <Box width="90%" marginTop={1.25} marginBottom={1.25}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="name"
              name="name"
              value={owner.name}
              onChange={(e) => setOwnerAttribute("name", e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="logoSrc"
              name="logoSrc"
              value={owner.logoSrc}
              onChange={(e) => setOwnerAttribute("logoSrc", e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="phone"
              name="phone"
              value={owner.phone}
              onChange={(e) => setOwnerAttribute("phone", e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="email"
              name="email"
              value={owner.email}
              onChange={(e) => setOwnerAttribute("email", e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Select
              value={owner.color}
              onChange={(e) => setOwnerAttribute("color", e.target.value)}
              fullWidth
            >
              {Object.values(OWNER_COLORS).map((color) => {
                return (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
      </Box>

      <WizardStepDescription>
        [TBD new informational step] - Next few steps will allow you to specify
        mechanics of reservation [OK]
      </WizardStepDescription>

      <ChangePageButtons
        onNext={() => setActiveStep(STORE_CONFIG_STEPS.FLEXIBILITY)}
      />
    </StepContentWrapper>
  );
}

export default Owner;
