import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useStoreConfig } from "../StoreConfigProvider";
import ChangePageButtons from "../components/ChangePageButtons";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { OWNER_COLORS } from "../../../types";

function Owner({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { storeConfig, setOwnerAttribute } = useStoreConfig();
  const { owner } = storeConfig;

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Owner
      </Typography>

      <Grid container spacing={1} width="50%">
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

        <Grid item xs={12} sm={6}>
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

      <Box marginTop={2}>
        <ChangePageButtons
          onNext={() => setActiveStep(STORE_CONFIG_STEPS.FLEXIBILITY)}
        />
      </Box>
    </>
  );
}

export default Owner;