import { Grid, TextField, Typography } from "@mui/material";
import { useStoreConfig } from "../StoreConfigProvider";

function Owner() {
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
      </Grid>
    </>
  );
}

export default Owner;
